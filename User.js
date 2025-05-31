const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number'],
    unique: true,
    trim: true,
    match: [
      /^\+?[0-9]{10,15}$/,
      'Please add a valid phone number'
    ]
  },
  email: {
    type: String,
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      'Please add a valid email'
    ]
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  whatsappVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate JWT
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Check if WhatsApp verification code is valid
UserSchema.methods.matchVerificationCode = async function(enteredCode) {
  // In a real implementation, this would check against a stored verification code
  // For now, we'll simulate verification with a simple check
  return enteredCode === '123456';
};

module.exports = mongoose.model('User', UserSchema);
