const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  issueDescription: { type: String, required: true },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'resolved', 'closed'],
    default: 'open'
  },
  responses: [{
    responseText: String,
    respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    responseDate: { type: Date, default: Date.now }
  }],
  createdDate: { type: Date, default: Date.now },
  lastUpdatedDate: { type: Date, default: Date.now }
});

module.exports = supportSchema;