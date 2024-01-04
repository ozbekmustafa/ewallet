var accountSchema = require('./schema.js'),
    mongoose = require('mongoose');

var model = mongoose.model('account', accountSchema);
module.exports = model;