const express = require('express');
const CommitteeMember = require('../models/CommitteeMember');
const { auth } = require('../middleware/auth');
const {
  committeeMemberValidation,
  handleValidationErrors,
  commonValidation,
} = require('../middleware/validation');

const router = express.Router();

// @desc    Get all committee members
// @route   GET /api/committee-members
// @access  Public
const getAllCommitteeMembers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;

    const filter = { isActive: true };
    
    if (req.query.year) {
      filter.year = req.query.year;
    }
    
    if (req.query.position) {
      filter.position = req.query.position;
    }

    // Define position hierarchy for sorting
    const positionOrder = {
      'President': 1,
      'Vice-President': 2,
      'Secretary': 3,
      'Joint-Secretary': 4,
      'Treasurer': 5,
      'Joint Treasurer': 6,
      'Editorial Team': 7,
      'Social Media Team': 8,
      'Creative Team': 9,
      'Technical Team': 10,
      'Core Committee': 11,
    };

    const members = await CommitteeMember.find(filter)
      .sort({ year: -1 }) // Sort by year descending first
      .skip(skip)
      .limit(limit);

    // Sort by position hierarchy within each year
    members.sort((a, b) => {
      if (a.year !== b.year) {
        return b.year.localeCompare(a.year); // Year descending
      }
      return (positionOrder[a.position] || 999) - (positionOrder[b.position] || 999);
    });

    const total = await CommitteeMember.countDocuments(filter);

    // Get available years for filtering
    const availableYears = await CommitteeMember.distinct('year', { isActive: true });
    availableYears.sort((a, b) => b.localeCompare(a));

    res.json({
      status: 'success',
      data: {
        members,
        availableYears,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Get all committee members error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

// @desc    Get single committee member
// @route   GET /api/committee-members/:id
// @access  Public
const getCommitteeMember = async (req, res) => {
  try {
    const member = await CommitteeMember.findById(req.params.id);

    if (!member) {
      return res.status(404).json({
        status: 'error',
        message: 'Committee member not found',
      });
    }

    res.json({
      status: 'success',
      data: {
        member,
      },
    });
  } catch (error) {
    console.error('Get committee member error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

// @desc    Create committee member
// @route   POST /api/committee-members
// @access  Private
const createCommitteeMember = async (req, res) => {
  try {
    const member = await CommitteeMember.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Committee member created successfully',
      data: {
        member,
      },
    });
  } catch (error) {
    console.error('Create committee member error:', error);
    
    // Handle duplicate key error for unique positions
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'A member with this position already exists for this year',
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Server error during member creation',
    });
  }
};

// @desc    Update committee member
// @route   PUT /api/committee-members/:id
// @access  Private
const updateCommitteeMember = async (req, res) => {
  try {
    const member = await CommitteeMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({
        status: 'error',
        message: 'Committee member not found',
      });
    }

    res.json({
      status: 'success',
      message: 'Committee member updated successfully',
      data: {
        member,
      },
    });
  } catch (error) {
    console.error('Update committee member error:', error);
    
    // Handle duplicate key error for unique positions
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'A member with this position already exists for this year',
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Server error during member update',
    });
  }
};

// @desc    Delete committee member
// @route   DELETE /api/committee-members/:id
// @access  Private
const deleteCommitteeMember = async (req, res) => {
  try {
    const member = await CommitteeMember.findByIdAndDelete(req.params.id);

    if (!member) {
      return res.status(404).json({
        status: 'error',
        message: 'Committee member not found',
      });
    }

    res.json({
      status: 'success',
      message: 'Committee member deleted successfully',
    });
  } catch (error) {
    console.error('Delete committee member error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during member deletion',
    });
  }
};

// Routes
router.get('/', commonValidation.pagination, getAllCommitteeMembers);
router.get('/:id', commonValidation.mongoId, handleValidationErrors, getCommitteeMember);

// Protected routes
router.use(auth);

router.post('/', committeeMemberValidation.create, handleValidationErrors, createCommitteeMember);
router.put('/:id', commonValidation.mongoId, handleValidationErrors, updateCommitteeMember);
router.delete('/:id', commonValidation.mongoId, handleValidationErrors, deleteCommitteeMember);

module.exports = router;