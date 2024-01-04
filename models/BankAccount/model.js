var bankAccountSchema = require('./schema.js'),
    mongoose = require('mongoose');

var model = mongoose.model('bankAccount', bankAccountSchema);
module.exports = model;