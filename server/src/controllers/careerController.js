import salesforceService from '../services/salesforceService.js';

/**
 * Format Salesforce Website_Career__c record to standard API response
 */
const formatCareerRecord = (record) => {
  if (!record) return null;

  const parseList = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    return val
      .split('\n')
      .map((item) => item.trim().replace(/^[-*•]\s*/, ''))
      .filter(Boolean);
  };

  const statusNormalized = (record.Status__c || 'Open').toLowerCase();
  const isActive = statusNormalized === 'open' || statusNormalized === 'active';

  return {
    _id: record.Id,
    id: record.Id,
    name: record.Name,
    careerNumber: record.Name,
    title: record.Job_Title__c || record.Name || 'Position',
    department: record.Department__c || 'Engineering',
    location: record.Location__c || 'Remote / Hybrid',
    employmentType: record.Employment_Type__c || 'Full-Time',
    jobType: record.Job_Type__c || '',
    experienceRequired: record.Experience_Required__c || '',
    salaryRange: record.Salary_Range__c || '',
    isFeatured: !!record.Is_Featured__c,
    applicationDeadline: record.Application_Deadline__c || null,
    applicationEmail: record.Application_Email__c || 'info@arrayminds.com',
    applicationUrl: record.Application_URL__c || '',
    description: record.Description__c || '',
    requirements: parseList(record.Requirements__c),
    responsibilities: parseList(record.Responsibilities__c),
    skills: parseList(record.Skills__c),
    rawRequirements: record.Requirements__c || '',
    rawResponsibilities: record.Responsibilities__c || '',
    rawSkills: record.Skills__c || '',
    status: isActive ? 'active' : statusNormalized === 'draft' ? 'draft' : 'closed',
    rawStatus: record.Status__c || 'Open',
    createdAt: record.CreatedDate,
  };
};

// @desc    Get all active careers (or all if admin)
// @route   GET /api/careers
// @access  Public / Admin
export const getCareers = async (req, res) => {
  try {
    const includeAll = req.query.all === 'true' || req.admin;

    let soql = `
      SELECT Id, Name, Job_Title__c, Department__c, Location__c, Employment_Type__c,
             Job_Type__c, Experience_Required__c, Salary_Range__c, Is_Featured__c,
             Application_Deadline__c, Application_Email__c, Application_URL__c,
             Description__c, Requirements__c, Responsibilities__c, Skills__c,
             Status__c, CreatedDate
      FROM Website_Career__c
    `;

    if (!includeAll) {
      soql += ` WHERE Status__c = 'Open' OR Status__c = 'open' OR Status__c = 'Active' OR Status__c = 'active'`;
    }

    soql += ` ORDER BY CreatedDate DESC`;

    const records = await salesforceService.query(soql);
    const careers = records.map(formatCareerRecord);
    res.json(careers);
  } catch (error) {
    console.error('Error fetching careers from Salesforce:', error);
    res.status(500).json({ 
      message: 'Failed to fetch careers from Salesforce',
      error: error.message 
    });
  }
};

// @desc    Get single career listing by ID
// @route   GET /api/careers/:id
// @access  Public
export const getCareerById = async (req, res) => {
  try {
    const { id } = req.params;
    const sanitizedId = id.replace(/'/g, "\\'");

    const soql = `
      SELECT Id, Name, Job_Title__c, Department__c, Location__c, Employment_Type__c,
             Job_Type__c, Experience_Required__c, Salary_Range__c, Is_Featured__c,
             Application_Deadline__c, Application_Email__c, Application_URL__c,
             Description__c, Requirements__c, Responsibilities__c, Skills__c,
             Status__c, CreatedDate
      FROM Website_Career__c
      WHERE Id = '${sanitizedId}'
      LIMIT 1
    `;

    const records = await salesforceService.query(soql);

    if (records.length === 0) {
      return res.status(404).json({ message: 'Career listing not found in Salesforce' });
    }

    res.json(formatCareerRecord(records[0]));
  } catch (error) {
    console.error('Error fetching career by ID from Salesforce:', error);
    res.status(500).json({ 
      message: 'Failed to fetch career listing from Salesforce',
      error: error.message 
    });
  }
};

// @desc    Create a new career listing
// @route   POST /api/careers
// @access  Private/Admin
export const createCareer = async (req, res) => {
  try {
    const {
      title,
      department,
      location,
      employmentType,
      jobType,
      experienceRequired,
      salaryRange,
      isFeatured,
      applicationDeadline,
      applicationEmail,
      applicationUrl,
      description,
      requirements,
      responsibilities,
      skills,
      status,
    } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Job title is required' });
    }

    const sfStatus = status === 'closed' ? 'Closed' : status === 'draft' ? 'Draft' : 'Open';

    const stringifyList = (val) => {
      if (!val) return '';
      if (Array.isArray(val)) return val.join('\n');
      return String(val);
    };

    const salesforcePayload = {
      Job_Title__c: title,
      Department__c: department || 'Engineering',
      Location__c: location || 'Remote / Hybrid',
      Employment_Type__c: employmentType || 'Full-Time',
      Status__c: sfStatus,
      Application_Email__c: applicationEmail || 'info@arrayminds.com',
    };

    if (jobType) salesforcePayload.Job_Type__c = jobType;
    if (experienceRequired) salesforcePayload.Experience_Required__c = experienceRequired;
    if (salaryRange) salesforcePayload.Salary_Range__c = salaryRange;
    if (isFeatured !== undefined) salesforcePayload.Is_Featured__c = !!isFeatured;
    if (applicationDeadline) salesforcePayload.Application_Deadline__c = applicationDeadline;
    if (applicationUrl) salesforcePayload.Application_URL__c = applicationUrl;
    if (description) salesforcePayload.Description__c = description;
    if (requirements) salesforcePayload.Requirements__c = stringifyList(requirements);
    if (responsibilities) salesforcePayload.Responsibilities__c = stringifyList(responsibilities);
    if (skills) salesforcePayload.Skills__c = stringifyList(skills);

    const result = await salesforceService.createRecord('Website_Career__c', salesforcePayload);
    const createdRecord = await salesforceService.getRecord('Website_Career__c', result.id);
    res.status(201).json(formatCareerRecord(createdRecord));
  } catch (error) {
    console.error('Error creating career in Salesforce:', error);
    res.status(400).json({ 
      message: 'Failed to create career listing in Salesforce',
      error: error.message 
    });
  }
};

// @desc    Update a career listing
// @route   PUT /api/careers/:id
// @access  Private/Admin
export const updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      department,
      location,
      employmentType,
      jobType,
      experienceRequired,
      salaryRange,
      isFeatured,
      applicationDeadline,
      applicationEmail,
      applicationUrl,
      description,
      requirements,
      responsibilities,
      skills,
      status,
    } = req.body;

    const stringifyList = (val) => {
      if (!val) return '';
      if (Array.isArray(val)) return val.join('\n');
      return String(val);
    };

    const salesforcePayload = {};
    if (title !== undefined) salesforcePayload.Job_Title__c = title;
    if (department !== undefined) salesforcePayload.Department__c = department;
    if (location !== undefined) salesforcePayload.Location__c = location;
    if (employmentType !== undefined) salesforcePayload.Employment_Type__c = employmentType;
    if (jobType !== undefined) salesforcePayload.Job_Type__c = jobType;
    if (experienceRequired !== undefined) salesforcePayload.Experience_Required__c = experienceRequired;
    if (salaryRange !== undefined) salesforcePayload.Salary_Range__c = salaryRange;
    if (isFeatured !== undefined) salesforcePayload.Is_Featured__c = !!isFeatured;
    if (applicationDeadline !== undefined) salesforcePayload.Application_Deadline__c = applicationDeadline;
    if (applicationEmail !== undefined) salesforcePayload.Application_Email__c = applicationEmail;
    if (applicationUrl !== undefined) salesforcePayload.Application_URL__c = applicationUrl;
    if (description !== undefined) salesforcePayload.Description__c = description;
    if (requirements !== undefined) salesforcePayload.Requirements__c = stringifyList(requirements);
    if (responsibilities !== undefined) salesforcePayload.Responsibilities__c = stringifyList(responsibilities);
    if (skills !== undefined) salesforcePayload.Skills__c = stringifyList(skills);
    if (status !== undefined) {
      salesforcePayload.Status__c = status === 'closed' ? 'Closed' : status === 'draft' ? 'Draft' : 'Open';
    }

    await salesforceService.updateRecord('Website_Career__c', id, salesforcePayload);
    const updatedRecord = await salesforceService.getRecord('Website_Career__c', id);
    res.json(formatCareerRecord(updatedRecord));
  } catch (error) {
    console.error('Error updating career in Salesforce:', error);
    res.status(400).json({ 
      message: 'Failed to update career listing in Salesforce',
      error: error.message 
    });
  }
};

// @desc    Delete a career listing
// @route   DELETE /api/careers/:id
// @access  Private/Admin
export const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;
    await salesforceService.deleteRecord('Website_Career__c', id);
    res.json({ message: 'Career listing removed successfully from Salesforce', id });
  } catch (error) {
    console.error('Error deleting career from Salesforce:', error);
    res.status(500).json({ 
      message: 'Failed to delete career listing from Salesforce',
      error: error.message 
    });
  }
};
