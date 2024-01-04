const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'support', 'finance', 'admin'], default: 'user' },
  phoneNumber: { type: String },
  phoneVerified: { type: Boolean, default: false },
  identityNumber: { type: String },
  identityVerified: { type: Boolean, default: false }
});

module.exports = userSchema;