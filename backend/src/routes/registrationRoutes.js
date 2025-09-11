const express = require('express');
const Registration = require('../models/Registration');
const Event = require('../models/Event');
const { auth, authorize } = require('../middleware/auth');
const {
  registrationValidation,
  handleValidationErrors,
  commonValidation,
} = require('../middleware/validation');

const router = express.Router();

// @desc    Create registration
// @route   POST /api/registrations
// @access  Public
const createRegistration = async (req, res) => {
  try {
    const { eventId, studentId, studentName, studentEmail, studentPhone, year, branch, additionalInfo } = req.body;

    // Check if event exists and is active
    const event = await Event.findById(eventId);
    if (!event || !event.isActive) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found or inactive',
      });
    }

    // Check if event is published
    if (event.status !== 'published') {
      return res.status(400).json({
        status: 'error',
        message: 'Event is not open for registration',
      });
    }

    // Check registration deadline
    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      return res.status(400).json({
        status: 'error',
        message: 'Registration deadline has passed',
      });
    }

    // Check capacity
    if (event.maxCapacity) {
      const currentRegistrations = await Registration.countDocuments({
        eventId,
        status: { $in: ['pending', 'confirmed'] },
      });
      
      if (currentRegistrations >= event.maxCapacity) {
        return res.status(400).json({
          status: 'error',
          message: 'Event is full',
        });
      }
    }

    // Check if student already registered
    const existingRegistration = await Registration.findOne({ eventId, studentId });
    if (existingRegistration) {
      return res.status(400).json({
        status: 'error',
        message: 'Student already registered for this event',
      });
    }

    const registration = await Registration.create({
      eventId,
      studentId,
      studentName,
      studentEmail,
      studentPhone,
      year,
      branch,
      additionalInfo,
    });

    const populatedRegistration = await Registration.findById(registration._id)
      .populate('eventId', 'title startDate location');

    res.status(201).json({
      status: 'success',
      message: 'Registration successful',
      data: {
        registration: populatedRegistration,
      },
    });
  } catch (error) {
    console.error('Create registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during registration',
    });
  }
};

// @desc    Get registrations for an event
// @route   GET /api/registrations/event/:eventId
// @access  Private
const getEventRegistrations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { eventId: req.params.eventId };
    
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const registrations = await Registration.find(filter)
      .populate('eventId', 'title startDate location')
      .sort({ registeredAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Registration.countDocuments(filter);

    res.json({
      status: 'success',
      data: {
        registrations,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Get event registrations error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

// @desc    Update registration status
// @route   PUT /api/registrations/:id/status
// @access  Private
const updateRegistrationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('eventId', 'title startDate location');

    if (!registration) {
      return res.status(404).json({
        status: 'error',
        message: 'Registration not found',
      });
    }

    res.json({
      status: 'success',
      message: 'Registration status updated successfully',
      data: {
        registration,
      },
    });
  } catch (error) {
    console.error('Update registration status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

// Routes
router.post('/', registrationValidation.create, handleValidationErrors, createRegistration);

// Protected routes
router.use(auth);

router.get('/event/:eventId', commonValidation.pagination, getEventRegistrations);
router.put('/:id/status', commonValidation.mongoId, handleValidationErrors, updateRegistrationStatus);

module.exports = router;