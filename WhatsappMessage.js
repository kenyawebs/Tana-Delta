const mongoose = require('mongoose');

const WhatsappMessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  phoneNumber: {
    type: String,
    required: [true, 'Please add a phone number'],
    trim: true,
    match: [
      /^\+?[0-9]{10,15}$/,
      'Please add a valid phone number'
    ]
  },
  direction: {
    type: String,
    enum: ['incoming', 'outgoing'],
    required: true
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'document', 'audio', 'video', 'location'],
    default: 'text'
  },
  content: {
    type: String,
    trim: true
  },
  mediaUrl: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['sent', 'delivered', 'read', 'failed'],
    default: 'sent'
  },
  relatedQuery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Query'
  },
  relatedDocument: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WhatsappMessage', WhatsappMessageSchema);
