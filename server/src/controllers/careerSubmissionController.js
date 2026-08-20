import fs from 'fs';
import path from 'path';
import salesforceService from '../services/salesforceService.js';

let cachedSubmissionFields = null;

const getAvailableFields = async () => {
  if (cachedSubmissionFields) return cachedSubmissionFields;
  try {
    const desc = await salesforceService.request('/sobjects/Website_Career_Submission__c/describe');
    cachedSubmissionFields = desc.fields.map((f) => f.name);
    return cachedSubmissionFields;
  } catch (error) {
    console.warn('Could not describe Website_Career_Submission__c:', error.message);
    return ['Id', 'Name', 'CreatedDate'];
  }
};

/**
 * Format Salesforce Website_Career_Submission__c record
 */
const formatSubmissionRecord = (record) => {
  if (!record) return null;

  return {
    _id: record.Id,
    id: record.Id,
    submissionNumber: record.Name,
    name: record.Candidate_Name__c || record.Name || 'Candidate',
    candidateName: record.Candidate_Name__c || record.Name || 'Candidate',
    email: record.Email__c || '',
    phone: record.Phone__c || '',
    careerId: record.Career__c || null,
    careerTitle: record.Career__r?.Job_Title__c || record.Career__r?.Name || 'Applied Position',
    careerDepartment: record.Career__r?.Department__c || '',
    resumeUrl: record.Resume_URL__c || '',
    coverLetter: record.Cover_Letter__c || '',
    linkedInUrl: record.LinkedIn_URL__c || '',
    portfolioUrl: record.Portfolio_URL__c || '',
    status: record.Status__c || 'Submitted',
    submittedDate: record.Submitted_Date__c || record.CreatedDate,
    notes: record.Notes__c || '',
    createdAt: record.CreatedDate,
  };
};

// @desc    Submit a job application (Public)
// @route   POST /api/career-submissions
// @access  Public
export const submitApplication = async (req, res) => {
  try {
    const {
      candidateName,
      name,
      email,
      phone,
      careerId,
      coverLetter,
      linkedInUrl,
      portfolioUrl,
    } = req.body;

    const applicantName = (candidateName || name || '').trim();

    if (!applicantName || !email) {
      return res.status(400).json({ message: 'Candidate name and email are required' });
    }

    const availableFields = await getAvailableFields();
    const payload = {};

    // Map exact Salesforce fields
    if (availableFields.includes('Candidate_Name__c')) {
      payload.Candidate_Name__c = applicantName;
    }
    if (availableFields.includes('Email__c')) {
      payload.Email__c = email;
    }
    if (availableFields.includes('Phone__c') && phone) {
      payload.Phone__c = phone;
    }
    if (availableFields.includes('Career__c') && careerId) {
      payload.Career__c = careerId;
    }
    if (availableFields.includes('Cover_Letter__c') && coverLetter) {
      payload.Cover_Letter__c = coverLetter;
    }
    if (availableFields.includes('LinkedIn_URL__c') && linkedInUrl) {
      payload.LinkedIn_URL__c = linkedInUrl;
    }
    if (availableFields.includes('Portfolio_URL__c') && portfolioUrl) {
      payload.Portfolio_URL__c = portfolioUrl;
    }
    if (availableFields.includes('Status__c')) {
      payload.Status__c = 'Submitted';
    }
    if (availableFields.includes('Submitted_Date__c')) {
      payload.Submitted_Date__c = new Date().toISOString();
    }

    // Set hosted URL if file uploaded
    let resumeUrl = req.body.resumeUrl || '';
    if (req.file) {
      const protocol = req.protocol || 'http';
      const host = req.get('host') || 'localhost:5000';
      resumeUrl = `${protocol}://${host}/uploads/resumes/${req.file.filename}`;
      if (availableFields.includes('Resume_URL__c')) {
        payload.Resume_URL__c = resumeUrl;
      }
    }

    // 1. Create the Website_Career_Submission__c record in Salesforce
    const result = await salesforceService.createRecord('Website_Career_Submission__c', payload);
    const submissionId = result.id;

    // 2. Attach Resume directly to Salesforce "Notes and Attachments" (ContentVersion)
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        const fileBase64 = fs.readFileSync(req.file.path, { encoding: 'base64' });
        const contentVersionPayload = {
          Title: `Resume - ${applicantName}`,
          PathOnClient: req.file.originalname,
          VersionData: fileBase64,
          FirstPublishLocationId: submissionId, // Links file to the Website_Career_Submission__c Notes & Attachments
        };

        await salesforceService.createRecord('ContentVersion', contentVersionPayload);
        console.log(`✅ Resume attached to Salesforce Notes & Attachments for Submission ${submissionId}`);
      } catch (attachError) {
        console.warn('⚠️ Warning attaching resume to Salesforce ContentVersion:', attachError.message);
      }
    }

    res.status(201).json({
      success: true,
      id: submissionId,
      message: 'Application submitted and resume attached to Salesforce successfully',
      resumeUrl,
    });
  } catch (error) {
    console.error('Error submitting application to Salesforce:', error);
    res.status(500).json({
      message: 'Failed to submit application to Salesforce',
      error: error.message,
    });
  }
};

// @desc    Get all career submissions (Admin)
// @route   GET /api/career-submissions
// @access  Private/Admin
export const getCareerSubmissions = async (req, res) => {
  try {
    const { careerId, status } = req.query;
    const availableFields = await getAvailableFields();

    const selectFields = ['Id', 'Name', 'CreatedDate'];
    const possibleFields = [
      'Candidate_Name__c',
      'Email__c',
      'Phone__c',
      'Career__c',
      'Resume_URL__c',
      'Cover_Letter__c',
      'LinkedIn_URL__c',
      'Portfolio_URL__c',
      'Status__c',
      'Submitted_Date__c',
      'Notes__c',
    ];

    possibleFields.forEach((f) => {
      if (availableFields.includes(f)) {
        selectFields.push(f);
      }
    });

    if (availableFields.includes('Career__c')) {
      selectFields.push('Career__r.Job_Title__c', 'Career__r.Department__c');
    }

    let soql = `SELECT ${selectFields.join(', ')} FROM Website_Career_Submission__c`;

    const whereClauses = [];
    if (careerId && availableFields.includes('Career__c')) {
      whereClauses.push(`Career__c = '${careerId.replace(/'/g, "\\'")}'`);
    }
    if (status && status !== 'ALL' && availableFields.includes('Status__c')) {
      whereClauses.push(`Status__c = '${status.replace(/'/g, "\\'")}'`);
    }

    if (whereClauses.length > 0) {
      soql += ` WHERE ${whereClauses.join(' AND ')}`;
    }

    soql += ` ORDER BY CreatedDate DESC`;

    const records = await salesforceService.query(soql);
    const submissions = records.map(formatSubmissionRecord);
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching career submissions from Salesforce:', error);
    res.status(500).json({
      message: 'Failed to fetch career submissions from Salesforce',
      error: error.message,
    });
  }
};

// @desc    Get single career submission by ID (Admin)
// @route   GET /api/career-submissions/:id
// @access  Private/Admin
export const getCareerSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const sanitizedId = id.replace(/'/g, "\\'");
    const availableFields = await getAvailableFields();

    const selectFields = ['Id', 'Name', 'CreatedDate'];
    [
      'Candidate_Name__c',
      'Email__c',
      'Phone__c',
      'Career__c',
      'Resume_URL__c',
      'Cover_Letter__c',
      'LinkedIn_URL__c',
      'Portfolio_URL__c',
      'Status__c',
      'Submitted_Date__c',
      'Notes__c',
    ].forEach((f) => {
      if (availableFields.includes(f)) selectFields.push(f);
    });

    if (availableFields.includes('Career__c')) {
      selectFields.push('Career__r.Job_Title__c', 'Career__r.Department__c');
    }

    const soql = `
      SELECT ${selectFields.join(', ')}
      FROM Website_Career_Submission__c
      WHERE Id = '${sanitizedId}'
      LIMIT 1
    `;

    const records = await salesforceService.query(soql);
    if (records.length === 0) {
      return res.status(404).json({ message: 'Career submission not found in Salesforce' });
    }

    res.json(formatSubmissionRecord(records[0]));
  } catch (error) {
    console.error('Error fetching career submission by ID from Salesforce:', error);
    res.status(500).json({
      message: 'Failed to fetch career submission',
      error: error.message,
    });
  }
};

// @desc    Update submission status and notes (Admin)
// @route   PATCH /api/career-submissions/:id
// @access  Private/Admin
export const updateCareerSubmissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    const availableFields = await getAvailableFields();

    const payload = {};
    if (status && availableFields.includes('Status__c')) {
      payload.Status__c = status;
    }
    if (notes !== undefined && availableFields.includes('Notes__c')) {
      payload.Notes__c = notes;
    }

    await salesforceService.updateRecord('Website_Career_Submission__c', id, payload);
    const updated = await salesforceService.getRecord('Website_Career_Submission__c', id);
    res.json(formatSubmissionRecord(updated));
  } catch (error) {
    console.error('Error updating career submission in Salesforce:', error);
    res.status(400).json({
      message: 'Failed to update career submission',
      error: error.message,
    });
  }
};

// @desc    Delete career submission (Admin)
// @route   DELETE /api/career-submissions/:id
// @access  Private/Admin
export const deleteCareerSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    await salesforceService.deleteRecord('Website_Career_Submission__c', id);
    res.json({ message: 'Career submission deleted from Salesforce', id });
  } catch (error) {
    console.error('Error deleting career submission from Salesforce:', error);
    res.status(500).json({
      message: 'Failed to delete career submission',
      error: error.message,
    });
  }
};
