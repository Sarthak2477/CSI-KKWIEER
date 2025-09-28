const Event = require('../models/Event');
const Registration = require('../models/Registration');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getAllEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = { isActive: true };
    
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    if (req.query.status) {
      filter.status = req.query.status;
    }
    
    if (req.query.featured === 'true') {
      filter.isFeatured = true;
    }

    // Date filters
    if (req.query.upcoming === 'true') {
      filter.startDate = { $gte: new Date() };
      filter.status = { $in: ['published', 'ongoing'] };
    }
    
    if (req.query.past === 'true') {
      filter.startDate = { $lt: new Date() };
    }

    const events = await Event.find(filter)
      .populate('adminId', 'name email')
      .populate('registrationCount')
      .sort({ startDate: req.query.upcoming === 'true' ? 1 : -1 })
      .skip(skip)
      .limit(limit);

    const total = await Event.countDocuments(filter);

    res.json({
      status: 'success',
      data: {
        events,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Get all events error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('adminId', 'name email')
      .populate('registrationCount');

    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found',
      });
    }

    res.json({
      status: 'success',
      data: {
        event,
      },
    });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

// @desc    Create event
// @route   POST /api/events
// @access  Private
const createEvent = async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      adminId: req.admin._id,
    };

    const event = await Event.create(eventData);
    
    const populatedEvent = await Event.findById(event._id)
      .populate('adminId', 'name email');

    res.status(201).json({
      status: 'success',
      message: 'Event created successfully',
      data: {
        event: populatedEvent,
      },
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during event creation',
    });
  }
};

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = async (req, res) => {
  try {
    let event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found',
      });
    }

    // Check if admin owns the event or is super admin
    if (event.adminId.toString() !== req.admin._id.toString() && req.admin.role !== 'super_admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to update this event',
      });
    }

    event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('adminId', 'name email');

    res.json({
      status: 'success',
      message: 'Event updated successfully',
      data: {
        event,
      },
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during event update',
    });
  }
};

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found',
      });
    }

    // Check if admin owns the event or is super admin
    if (event.adminId.toString() !== req.admin._id.toString() && req.admin.role !== 'super_admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Not authorized to delete this event',
      });
    }

    // Check if event has registrations
    const registrationCount = await Registration.countDocuments({ eventId: req.params.id });
    if (registrationCount > 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Cannot delete event with existing registrations',
      });
    }

    await Event.findByIdAndDelete(req.params.id);

    res.json({
      status: 'success',
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during event deletion',
    });
  }
};

// @desc    Get event statistics
// @route   GET /api/events/stats
// @access  Private
const getEventStats = async (req, res) => {
  try {
    const totalEvents = await Event.countDocuments({ isActive: true });
    const upcomingEvents = await Event.countDocuments({
      isActive: true,
      startDate: { $gte: new Date() },
    });
    const ongoingEvents = await Event.countDocuments({
      isActive: true,
      status: 'ongoing',
    });
    const completedEvents = await Event.countDocuments({
      isActive: true,
      status: 'completed',
    });

    // Events by category
    const eventsByCategory = await Event.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Recent events
    const recentEvents = await Event.find({ isActive: true })
      .populate('adminId', 'name')
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title category startDate status');

    res.json({
      status: 'success',
      data: {
        stats: {
          totalEvents,
          upcomingEvents,
          ongoingEvents,
          completedEvents,
        },
        eventsByCategory,
        recentEvents,
      },
    });
  } catch (error) {
    console.error('Get event stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

module.exports = {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventStats,
};