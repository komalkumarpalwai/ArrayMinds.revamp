import salesforceService from '../services/salesforceService.js';

/**
 * Format Salesforce Lead record to standard Contact Submission format for frontend
 */
const formatLeadToSubmission = (lead) => {
  if (!lead) return null;

  // Extract Subject and Message from Description if formatted with Subject header
  let subject = 'General Inquiry';
  let message = lead.Description || '';

  if (lead.Description && lead.Description.startsWith('[Subject:')) {
    const match = lead.Description.match(/^\[Subject:\s*([^\]]+)\]\n*([\s\S]*)$/);
    if (match) {
      subject = match[1].trim();
      message = match[2].trim();
    }
  }

  // Normalize Lead status for UI badge
  const rawStatus = lead.Status || 'Open - Not Contacted';
  let status = 'new';
  if (rawStatus.includes('Open') || rawStatus === 'new') {
    status = 'new';
  } else if (rawStatus.includes('Working') || rawStatus.includes('In Progress') || rawStatus === 'in-progress') {
    status = 'in-progress';
  } else if (rawStatus.includes('Contacted') || rawStatus === 'read') {
    status = 'read';
  } else if (rawStatus.includes('Closed') || rawStatus.includes('Unqualified') || rawStatus === 'archived') {
    status = 'archived';
  }

  return {
    _id: lead.Id,
    id: lead.Id,
    name: [lead.FirstName, lead.LastName].filter(Boolean).join(' ') || lead.Name || 'Website Visitor',
    firstName: lead.FirstName || '',
    lastName: lead.LastName || '',
    email: lead.Email || '',
    phone: lead.Phone || '',
    company: lead.Company || '',
    subject,
    message,
    status,
    rawStatus,
    leadSource: lead.LeadSource || 'Website',
    createdAt: lead.CreatedDate,
  };
};

// @desc    Submit a contact form inquiry -> Create Salesforce Lead
// @route   POST /api/contact
// @access  Public
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    // Split Name into FirstName and LastName for Salesforce Lead
    const nameParts = name.trim().split(/\s+/);
    let firstName = '';
    let lastName = 'Inquiry';

    if (nameParts.length === 1) {
      lastName = nameParts[0];
    } else {
      firstName = nameParts.slice(0, -1).join(' ');
      lastName = nameParts[nameParts.length - 1];
    }

    // Salesforce Lead requires Company; default to "Website Visitor" or provided company
    const leadCompany = company && company.trim() ? company.trim() : 'Website Visitor';

    // Format Description with subject
    const formattedDescription = subject ? `[Subject: ${subject}]\n\n${message}` : message;

    const leadPayload = {
      FirstName: firstName,
      LastName: lastName,
      Email: email.trim(),
      Phone: phone ? phone.trim() : undefined,
      Company: leadCompany,
      Description: formattedDescription,
      LeadSource: 'Website',
      Status: 'Open - Not Contacted',
    };

    const result = await salesforceService.createRecord('Lead', leadPayload);
    const createdLead = await salesforceService.getRecord('Lead', result.id);

    res.status(201).json({
      message: 'Contact inquiry recorded successfully in Salesforce CRM',
      submission: formatLeadToSubmission(createdLead),
    });
  } catch (error) {
    console.error('Error submitting contact form to Salesforce:', error);
    res.status(400).json({ 
      message: 'Failed to record contact submission in Salesforce',
      error: error.message 
    });
  }
};

// @desc    Get all contact form submissions (Salesforce Leads with LeadSource='Website')
// @route   GET /api/contact
// @access  Private/Admin
export const getContactSubmissions = async (req, res) => {
  try {
    const soql = `
      SELECT Id, Name, FirstName, LastName, Email, Phone, Company, 
             Description, Status, LeadSource, CreatedDate
      FROM Lead
      WHERE LeadSource = 'Website'
      ORDER BY CreatedDate DESC
      LIMIT 200
    `;

    const records = await salesforceService.query(soql);
    const submissions = records.map(formatLeadToSubmission);
    res.json(submissions);
  } catch (error) {
    console.error('Error fetching contact leads from Salesforce:', error);
    res.status(500).json({ 
      message: 'Failed to fetch contact submissions from Salesforce',
      error: error.message 
    });
  }
};

// @desc    Get single contact submission by ID
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getContactSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const sanitizedId = id.replace(/'/g, "\\'");

    const soql = `
      SELECT Id, Name, FirstName, LastName, Email, Phone, Company, 
             Description, Status, LeadSource, CreatedDate
      FROM Lead
      WHERE Id = '${sanitizedId}'
      LIMIT 1
    `;

    const records = await salesforceService.query(soql);

    if (records.length === 0) {
      return res.status(404).json({ message: 'Submission not found in Salesforce' });
    }

    res.json(formatLeadToSubmission(records[0]));
  } catch (error) {
    console.error('Error fetching contact lead from Salesforce:', error);
    res.status(500).json({ 
      message: 'Failed to fetch contact submission from Salesforce',
      error: error.message 
    });
  }
};

// @desc    Update submission status (e.g. mark read/in-progress/closed in Salesforce Lead)
// @route   PUT /api/contact/:id
// @access  Private/Admin
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const statusMap = {
      new: 'Open - Not Contacted',
      'in-progress': 'Working - Contacted',
      read: 'Working - Contacted',
      archived: 'Closed - Not Converted',
    };

    const sfStatus = statusMap[status] || status || 'Working - Contacted';

    await salesforceService.updateRecord('Lead', id, { Status: sfStatus });
    const updatedLead = await salesforceService.getRecord('Lead', id);

    res.json(formatLeadToSubmission(updatedLead));
  } catch (error) {
    console.error('Error updating Lead status in Salesforce:', error);
    res.status(400).json({ 
      message: 'Failed to update submission status in Salesforce',
      error: error.message 
    });
  }
};
