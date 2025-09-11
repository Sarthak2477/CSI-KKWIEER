const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: [true, 'Payment amount is required'],
    min: [0, 'Amount cannot be negative'],
  },
  method: {
    type: String,
    enum: ['cash', 'upi', 'card', 'net_banking', 'wallet'],
    required: [true, 'Payment method is required'],
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true, // Allow null values but ensure uniqueness when present
  },
  paidAt: {
    type: Date,
  },
  registrationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration',
    required: [true, 'Registration ID is required'],
    unique: true,
  },
  paymentGatewayResponse: {
    type: mongoose.Schema.Types.Mixed, // Store gateway response data
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
PaymentSchema.index({ status: 1 });
PaymentSchema.index({ method: 1 });
PaymentSchema.index({ paidAt: 1 });
PaymentSchema.index({ transactionId: 1 });

// Set paidAt when status changes to completed
PaymentSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'completed' && !this.paidAt) {
    this.paidAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Payment', PaymentSchema);