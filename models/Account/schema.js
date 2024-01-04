const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  accountNumber: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  currency: { type: String, required: true }
});

module.exports = accountSchema;