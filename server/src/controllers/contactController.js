import ContactSubmission from '../models/ContactSubmission.js';

// @desc    Submit a contact form inquiry
// @route   POST /api/contact
// @access  Public
export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, company, subject, message } = req.body;
    const submission = new ContactSubmission({
      name,
      email,
      phone,
      company,
      subject,
      message,
    });

    const savedSubmission = await submission.save();
    res.status(201).json({ message: 'Contact inquiry submitted successfully', submission: savedSubmission });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all contact form submissions
// @route   GET /api/contact
// @access  Private/Admin
export const getContactSubmissions = async (req, res) => {
  try {
    const submissions = await ContactSubmission.find({}).sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single contact submission by ID
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getContactSubmissionById = async (req, res) => {
  try {
    const submission = await ContactSubmission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update submission status (e.g. mark read/in-progress)
// @route   PUT /api/contact/:id
// @access  Private/Admin
export const updateContactStatus = async (req, res) => {
  try {
    const submission = await ContactSubmission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    if (req.body.status) {
      submission.status = req.body.status;
    }

    const updatedSubmission = await submission.save();
    res.json(updatedSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
