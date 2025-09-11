const express = require('express');
const {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventStats,
} = require('../controllers/eventController');
const { auth, authorize } = require('../middleware/auth');
const {
  eventValidation,
  handleValidationErrors,
  commonValidation,
} = require('../middleware/validation');

const router = express.Router();

// Public routes
router.get('/', commonValidation.pagination, getAllEvents);
router.get('/:id', commonValidation.mongoId, handleValidationErrors, getEvent);

// Protected routes
router.use(auth); // All routes below require authentication

router.post('/', eventValidation.create, handleValidationErrors, createEvent);
router.put('/:id', eventValidation.update, handleValidationErrors, updateEvent);
router.delete('/:id', commonValidation.mongoId, handleValidationErrors, deleteEvent);

// Admin only routes
router.get('/admin/stats', authorize('admin', 'super_admin'), getEventStats);

module.exports = router;