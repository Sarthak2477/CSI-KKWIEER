const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Access denied. No token provided.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');

    if (!admin) {
      return res.status(401).json({
        status: 'error',
        message: 'Token is not valid.',
      });
    }

    if (!admin.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Account is deactivated.',
      });
    }

    req.admin = admin;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      status: 'error',
      message: 'Token is not valid.',
    });
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        status: 'error',
        message: 'Access denied. Please authenticate.',
      });
    }

    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied. Insufficient permissions.',
      });
    }

    next();
  };
};

module.exports = { auth, authorize };