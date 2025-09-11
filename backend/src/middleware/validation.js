const { body, param, query, validationResult } = require('express-validator');

// Validation result handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

// Admin validation rules
const adminValidation = {
  register: [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
    body('role')
      .optional()
      .isIn(['super_admin', 'admin', 'moderator'])
      .withMessage('Invalid role'),
  ],
  login: [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('password')
      .notEmpty()
      .withMessage('Password is required'),
  ],
};

// Event validation rules
const eventValidation = {
  create: [
    body('title')
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Title must be between 3 and 200 characters'),
    body('description')
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage('Description must be between 10 and 2000 characters'),
    body('category')
      .isIn(['workshop', 'seminar', 'competition', 'hackathon', 'conference', 'networking', 'exhibition', 'other'])
      .withMessage('Invalid category'),
    body('startDate')
      .isISO8601()
      .toDate()
      .withMessage('Please provide a valid start date'),
    body('startTime')
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
      .withMessage('Please provide a valid start time (HH:MM)'),
    body('location')
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Location must be between 3 and 200 characters'),
    body('image')
      .notEmpty()
      .withMessage('Event image is required'),
  ],
  update: [
    param('id').isMongoId().withMessage('Invalid event ID'),
    body('title')
      .optional()
      .trim()
      .isLength({ min: 3, max: 200 })
      .withMessage('Title must be between 3 and 200 characters'),
    body('description')
      .optional()
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage('Description must be between 10 and 2000 characters'),
    body('category')
      .optional()
      .isIn(['workshop', 'seminar', 'competition', 'hackathon', 'conference', 'networking', 'exhibition', 'other'])
      .withMessage('Invalid category'),
  ],
};

// Registration validation rules
const registrationValidation = {
  create: [
    body('eventId').isMongoId().withMessage('Invalid event ID'),
    body('studentId')
      .trim()
      .notEmpty()
      .withMessage('Student ID is required'),
    body('studentName')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Student name must be between 2 and 100 characters'),
    body('studentEmail')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('studentPhone')
      .optional()
      .matches(/^[0-9]{10}$/)
      .withMessage('Please provide a valid 10-digit phone number'),
  ],
};

// Committee member validation rules
const committeeMemberValidation = {
  create: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters'),
    body('position')
      .isIn([
        'President', 'Vice-President', 'Secretary', 'Joint-Secretary',
        'Treasurer', 'Joint Treasurer', 'Editorial Team', 'Social Media Team',
        'Creative Team', 'Technical Team', 'Core Committee'
      ])
      .withMessage('Invalid position'),
    body('year')
      .matches(/^\d{4}$/)
      .withMessage('Please provide a valid year (YYYY)'),
    body('email')
      .optional()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email'),
    body('image')
      .notEmpty()
      .withMessage('Member image is required'),
  ],
};

// Common validation rules
const commonValidation = {
  mongoId: [
    param('id').isMongoId().withMessage('Invalid ID format'),
  ],
  pagination: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100'),
  ],
};

module.exports = {
  handleValidationErrors,
  adminValidation,
  eventValidation,
  registrationValidation,
  committeeMemberValidation,
  commonValidation,
};