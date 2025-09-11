const express = require('express');
const Payment = require('../models/Payment');
const Registration = require('../models/Registration');
const { auth } = require('../middleware/auth');
const { commonValidation, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// @desc    Create payment
// @route   POST /api/payments
// @access  Public
const createPayment = async (req, res) => {
  try {
    const { registrationId, amount, method } = req.body;

    // Check if registration exists
    const registration = await Registration.findById(registrationId);
    if (!registration) {
      return res.status(404).json({
        status: 'error',
        message: 'Registration not found',
      });
    }

    // Check if payment already exists for this registration
    const existingPayment = await Payment.findOne({ registrationId });
    if (existingPayment) {
      return res.status(400).json({
        status: 'error',
        message: 'Payment already exists for this registration',
      });
    }

    const payment = await Payment.create({
      registrationId,
      amount,
      method,
      status: 'pending',
    });

    res.status(201).json({
      status: 'success',
      message: 'Payment initiated successfully',
      data: {
        payment,
      },
    });
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error during payment creation',
    });
  }
};

// @desc    Update payment status
// @route   PUT /api/payments/:id/status
// @access  Private
const updatePaymentStatus = async (req, res) => {
  try {
    const { status, transactionId, paymentGatewayResponse } = req.body;

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { 
        status, 
        transactionId,
        paymentGatewayResponse,
        ...(status === 'completed' && { paidAt: new Date() })
      },
      { new: true, runValidators: true }
    ).populate({
      path: 'registrationId',
      populate: {
        path: 'eventId',
        select: 'title startDate location'
      }
    });

    if (!payment) {
      return res.status(404).json({
        status: 'error',
        message: 'Payment not found',
      });
    }

    // Update registration status if payment is completed
    if (status === 'completed') {
      await Registration.findByIdAndUpdate(
        payment.registrationId._id,
        { status: 'confirmed' }
      );
    }

    res.json({
      status: 'success',
      message: 'Payment status updated successfully',
      data: {
        payment,
      },
    });
  } catch (error) {
    console.error('Update payment status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

// @desc    Get payment by registration ID
// @route   GET /api/payments/registration/:registrationId
// @access  Public
const getPaymentByRegistration = async (req, res) => {
  try {
    const payment = await Payment.findOne({ registrationId: req.params.registrationId })
      .populate({
        path: 'registrationId',
        populate: {
          path: 'eventId',
          select: 'title startDate location'
        }
      });

    if (!payment) {
      return res.status(404).json({
        status: 'error',
        message: 'Payment not found',
      });
    }

    res.json({
      status: 'success',
      data: {
        payment,
      },
    });
  } catch (error) {
    console.error('Get payment by registration error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error',
    });
  }
};

// Routes
router.post('/', createPayment);
router.get('/registration/:registrationId', getPaymentByRegistration);

// Protected routes
router.use(auth);

router.put('/:id/status', commonValidation.mongoId, handleValidationErrors, updatePaymentStatus);

module.exports = router;