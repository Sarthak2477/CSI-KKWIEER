const mongoose = require('mongoose');

const CommitteeMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Member name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  position: {
    type: String,
    required: [true, 'Position is required'],
    enum: [
      'President',
      'Vice-President',
      'Secretary',
      'Joint-Secretary',
      'Treasurer',
      'Joint Treasurer',
      'Editorial Team',
      'Social Media Team',
      'Creative Team',
      'Technical Team',
      'Core Committee'
    ],
  },
  year: {
    type: String,
    required: [true, 'Year is required'],
    match: [/^\d{4}$/, 'Please enter a valid year (YYYY)'],
  },
  email: {
    type: String,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  linkedin: {
    type: String,
    match: [/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/, 'Please enter a valid LinkedIn URL'],
  },
  image: {
    type: String,
    required: [true, 'Member image is required'],
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
CommitteeMemberSchema.index({ position: 1 });
CommitteeMemberSchema.index({ year: 1 });
CommitteeMemberSchema.index({ isActive: 1 });

// Compound index for unique position per year (except Core Committee)
CommitteeMemberSchema.index(
  { position: 1, year: 1 },
  { 
    unique: true,
    partialFilterExpression: { 
      position: { $ne: 'Core Committee' }
    }
  }
);

module.exports = mongoose.model('CommitteeMember', CommitteeMemberSchema);