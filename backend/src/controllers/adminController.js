const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// @desc    Register admin
// @route   POST /api/admin/register
// @access  Public (should be restricted in production)
const registerAdmin = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        status: 'error',
        message: 'Admin with this email already exists',
      });
    }

    // Create admin
    const admin = await Admin.create({
      email,
      password,
      name,
      role: role || 'admin',
    });

    // Generate token
    const token = generateToken(admin._id);

    res.status(201).json({
      status: 'success',
      message: 'Admin registered successfully',
      data: {
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Register admin error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during registration',
    });
  }
};

// @desc    Login admin
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists and get password
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }

    // Check if admin is active
    if (!admin.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Account is deactivated',
      });
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }

    // Generate token
    const token = generateToken(admin._id);

    res.json({
      status: 'success',
      message: 'Login successful',
      data: {
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
        token,
      },
    });
  } catch (error) {
    console.error('Login admin error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during login',
    });
  }
};

// @desc    Get current admin profile
// @route   GET /api/admin/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    res.json({
      status: 'success',
      data: {
        admin: req.admin,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

// @desc    Update admin profile
// @route   PUT /api/admin/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      { name, email },
      { new: true, runValidators: true }
    );

    res.json({
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        admin,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during profile update',
    });
  }
};

// @desc    Get all admins
// @route   GET /api/admin/all
// @access  Private (Super Admin only)
const getAllAdmins = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const admins = await Admin.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Admin.countDocuments();

    res.json({
      status: 'success',
      data: {
        admins,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Get all admins error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getProfile,
  updateProfile,
  getAllAdmins,
};