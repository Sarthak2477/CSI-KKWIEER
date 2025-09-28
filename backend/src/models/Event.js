const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters'],
  },
  shortDesc: {
    type: String,
    maxlength: [500, 'Short description cannot exceed 500 characters'],
  },
  category: {
    type: String,
    required: [true, 'Event category is required'],
    enum: ['workshop', 'seminar', 'competition', 'hackathon', 'conference', 'networking', 'exhibition', 'talks', 'ceremony', 'activity', 'award', 'other'],
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'ongoing', 'completed', 'cancelled'],
    default: 'draft',
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value >= this.startDate;
      },
      message: 'End date must be after start date',
    },
  },
  startTime: {
    type: String,
    required: [true, 'Start time is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format (HH:MM)'],
  },
  endTime: {
    type: String,
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please enter a valid time format (HH:MM)'],
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters'],
  },
  maxCapacity: {
    type: Number,
    min: [1, 'Maximum capacity must be at least 1'],
    max: [10000, 'Maximum capacity cannot exceed 10000'],
  },
  registrationDeadline: {
    type: Date,
    validate: {
      validator: function(value) {
        return !value || value <= this.startDate;
      },
      message: 'Registration deadline must be before event start date',
    },
  },
  image: {
    type: String,
    required: [true, 'Event image is required'],
  },
  images: [{
    type: String,
  }],
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: [true, 'Admin ID is required'],
  },
  participants: {
    type: Number,
    default: 0,
  },
  attendees: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
EventSchema.index({ category: 1 });
EventSchema.index({ status: 1 });
EventSchema.index({ startDate: 1 });
EventSchema.index({ isFeatured: 1 });
EventSchema.index({ isActive: 1 });

// Virtual for registration count
EventSchema.virtual('registrationCount', {
  ref: 'Registration',
  localField: '_id',
  foreignField: 'eventId',
  count: true,
});

// Virtual for formatted time
EventSchema.virtual('time').get(function() {
  return `${this.startTime}${this.endTime ? ' - ' + this.endTime : ''}`;
});

// Ensure virtual fields are serialized
EventSchema.set('toJSON', { virtuals: true });
EventSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Event', EventSchema);