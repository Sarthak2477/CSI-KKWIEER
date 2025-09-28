const express = require('express');
const GalleryImage = require('../models/GalleryImage');
const { auth } = require('../middleware/auth');
const { commonValidation, handleValidationErrors } = require('../middleware/validation');
const { body } = require('express-validator');
const upload = require('../middleware/upload');
const path = require('path');

const router = express.Router();

// Gallery image validation
const galleryValidation = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Title must be between 3 and 200 characters'),
    body('imageUrl')
      .notEmpty()
      .withMessage('Image URL is required'),
    body('category')
      .optional()
      .isIn(['workshop', 'seminar', 'competition', 'hackathon', 'conference', 'networking', 'exhibition', 'talks', 'ceremony', 'activity', 'award', 'other'])
      .withMessage('Invalid category'),
  ],
};

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
const getAllGalleryImages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const filter = { isActive: true };
    
    if (req.query.category) {
      filter.category = req.query.category;
    }
    
    if (req.query.eventName) {
      filter.eventName = new RegExp(req.query.eventName, 'i');
    }

    const images = await GalleryImage.find(filter)
      .populate('uploadedBy', 'name')
      .sort({ uploadedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await GalleryImage.countDocuments(filter);

    res.json({
      status: 'success',
      data: {
        images,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Get all gallery images error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

// @desc    Get single gallery image
// @route   GET /api/gallery/:id
// @access  Public
const getGalleryImage = async (req, res) => {
  try {
    const image = await GalleryImage.findById(req.params.id)
      .populate('uploadedBy', 'name');

    if (!image) {
      return res.status(404).json({
        status: 'error',
        message: 'Image not found',
      });
    }

    res.json({
      status: 'success',
      data: {
        image,
      },
    });
  } catch (error) {
    console.error('Get gallery image error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

// @desc    Create gallery image
// @route   POST /api/gallery
// @access  Private
const createGalleryImage = async (req, res) => {
  try {
    const imageData = {
      ...req.body,
      uploadedBy: req.admin._id,
    };

    const image = await GalleryImage.create(imageData);
    
    const populatedImage = await GalleryImage.findById(image._id)
      .populate('uploadedBy', 'name');

    res.status(201).json({
      status: 'success',
      message: 'Gallery image created successfully',
      data: {
        image: populatedImage,
      },
    });
  } catch (error) {
    console.error('Create gallery image error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during image creation',
    });
  }
};

// @desc    Update gallery image
// @route   PUT /api/gallery/:id
// @access  Private
const updateGalleryImage = async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('uploadedBy', 'name');

    if (!image) {
      return res.status(404).json({
        status: 'error',
        message: 'Image not found',
      });
    }

    res.json({
      status: 'success',
      message: 'Gallery image updated successfully',
      data: {
        image,
      },
    });
  } catch (error) {
    console.error('Update gallery image error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during image update',
    });
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private
const deleteGalleryImage = async (req, res) => {
  try {
    const image = await GalleryImage.findByIdAndDelete(req.params.id);

    if (!image) {
      return res.status(404).json({
        status: 'error',
        message: 'Image not found',
      });
    }

    res.json({
      status: 'success',
      message: 'Gallery image deleted successfully',
    });
  } catch (error) {
    console.error('Delete gallery image error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during image deletion',
    });
  }
};

// Routes
router.get('/', commonValidation.pagination, getAllGalleryImages);
router.get('/:id', commonValidation.mongoId, handleValidationErrors, getGalleryImage);

// Protected routes
router.use(auth);

router.post('/', galleryValidation.create, handleValidationErrors, createGalleryImage);
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'error',
        message: 'No image file provided',
      });
    }

    const imageUrl = `/uploads/gallery/${req.file.filename}`;
    const imageData = {
      ...req.body,
      imageUrl,
      uploadedBy: req.admin._id,
    };

    const image = await GalleryImage.create(imageData);
    const populatedImage = await GalleryImage.findById(image._id)
      .populate('uploadedBy', 'name');

    res.status(201).json({
      status: 'success',
      message: 'Image uploaded successfully',
      data: {
        image: populatedImage,
      },
    });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during image upload',
    });
  }
});
router.put('/:id', commonValidation.mongoId, handleValidationErrors, updateGalleryImage);
router.delete('/:id', commonValidation.mongoId, handleValidationErrors, deleteGalleryImage);

module.exports = router;