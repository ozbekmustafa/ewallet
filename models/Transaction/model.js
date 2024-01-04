var transactionSchema = require('./schema.js'),
    mongoose = require('mongoose');

var model = mongoose.model('transaction', transactionSchema);
module.exports = model;