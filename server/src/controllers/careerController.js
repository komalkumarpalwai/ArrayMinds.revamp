import Career from '../models/Career.js';

// @desc    Get all active careers
// @route   GET /api/careers
// @access  Public
export const getCareers = async (req, res) => {
  try {
    const careers = await Career.find({}).sort({ createdAt: -1 });
    res.json(careers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single career listing by ID
// @route   GET /api/careers/:id
// @access  Public
export const getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career listing not found' });
    }
    res.json(career);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new career listing
// @route   POST /api/careers
// @access  Private/Admin
export const createCareer = async (req, res) => {
  try {
    const { title, department, location, employmentType, description, requirements, responsibilities, status } = req.body;
    const career = new Career({
      title,
      department,
      location,
      employmentType,
      description,
      requirements,
      responsibilities,
      status,
    });

    const createdCareer = await career.save();
    res.status(201).json(createdCareer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a career listing
// @route   PUT /api/careers/:id
// @access  Private/Admin
export const updateCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career listing not found' });
    }

    Object.assign(career, req.body);
    const updatedCareer = await career.save();
    res.json(updatedCareer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a career listing
// @route   DELETE /api/careers/:id
// @access  Private/Admin
export const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career listing not found' });
    }

    await career.deleteOne();
    res.json({ message: 'Career listing removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
