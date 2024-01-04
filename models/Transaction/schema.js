const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bankAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'BankAccount', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  timestamp: { type: Date, default: Date.now },
});

module.exports = transactionSchema;