const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a document title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  documentType: {
    type: String,
    enum: ['charge_sheet', 'court_order', 'bail_application', 'appeal', 'affidavit', 'other'],
    required: [true, 'Please specify document type']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  fileUrl: {
    type: String,
    required: [true, 'Please add a file URL']
  },
  fileName: {
    type: String,
    required: [true, 'Please add a file name']
  },
  fileType: {
    type: String,
    required: [true, 'Please add a file type']
  },
  fileSize: {
    type: Number,
    required: [true, 'Please add a file size']
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  analysis: {
    type: String,
    trim: true
  },
  recommendations: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
DocumentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Document', DocumentSchema);
