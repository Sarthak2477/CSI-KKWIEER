const mongoose = require('mongoose');

const GalleryImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Image title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters'],
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
  },
  eventName: {
    type: String,
    trim: true,
    maxlength: [200, 'Event name cannot exceed 200 characters'],
  },
  category: {
    type: String,
    enum: ['workshop', 'seminar', 'competition', 'hackathon', 'conference', 'networking', 'exhibition', 'talks', 'ceremony', 'activity', 'award', 'other'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
GalleryImageSchema.index({ category: 1 });
GalleryImageSchema.index({ isActive: 1 });
GalleryImageSchema.index({ uploadedAt: 1 });
GalleryImageSchema.index({ eventName: 1 });

module.exports = mongoose.model('GalleryImage', GalleryImageSchema);