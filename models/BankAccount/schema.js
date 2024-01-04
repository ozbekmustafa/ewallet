const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  IBAN: { type: String, required: true }
});

module.exports = bankAccountSchema;