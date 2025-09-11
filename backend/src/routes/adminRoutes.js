const express = require('express');
const {
  registerAdmin,
  loginAdmin,
  getProfile,
  updateProfile,
  getAllAdmins,
} = require('../controllers/adminController');
const { auth, authorize } = require('../middleware/auth');
const {
  adminValidation,
  handleValidationErrors,
  commonValidation,
} = require('../middleware/validation');

const router = express.Router();

// Public routes
router.post('/register', adminValidation.register, handleValidationErrors, registerAdmin);
router.post('/login', adminValidation.login, handleValidationErrors, loginAdmin);

// Protected routes
router.use(auth); // All routes below require authentication

router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Super admin only routes
router.get('/all', authorize('super_admin'), commonValidation.pagination, getAllAdmins);

module.exports = router;