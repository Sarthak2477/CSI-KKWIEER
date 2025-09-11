const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'attended', 'no_show'],
    default: 'pending',
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: [true, 'Event ID is required'],
  },
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    trim: true,
  },
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
    maxlength: [100, 'Student name cannot exceed 100 characters'],
  },
  studentEmail: {
    type: String,
    required: [true, 'Student email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  studentPhone: {
    type: String,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'],
  },
  year: {
    type: String,
    enum: ['FE', 'SE', 'TE', 'BE'],
  },
  branch: {
    type: String,
    enum: ['Computer', 'IT', 'Electronics', 'Mechanical', 'Civil', 'Electrical', 'Other'],
  },
  additionalInfo: {
    type: String,
    maxlength: [500, 'Additional info cannot exceed 500 characters'],
  },
}, {
  timestamps: true,
});

// Compound index to prevent duplicate registrations
RegistrationSchema.index({ eventId: 1, studentId: 1 }, { unique: true });

// Indexes for better query performance
RegistrationSchema.index({ status: 1 });
RegistrationSchema.index({ registeredAt: 1 });
RegistrationSchema.index({ studentEmail: 1 });

module.exports = mongoose.model('Registration', RegistrationSchema);