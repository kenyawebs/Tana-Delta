const mongoose = require('mongoose');

const QuerySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  queryText: {
    type: String,
    required: [true, 'Please add a query text'],
    trim: true,
    maxlength: [2000, 'Query cannot be more than 2000 characters']
  },
  queryType: {
    type: String,
    enum: ['legal_definition', 'case_law', 'procedural_guidance', 'general'],
    default: 'general'
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  answer: {
    type: String,
    trim: true
  },
  references: [{
    title: String,
    section: String,
    text: String
  }],
  caseLaws: [{
    caseNumber: String,
    caseName: String,
    summary: String
  }],
  processingTime: {
    type: Number,
    default: 0
  },
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
QuerySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Query', QuerySchema);
