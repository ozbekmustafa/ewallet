var userSchema = require('./schema.js'),
    mongoose = require('mongoose');

var model = mongoose.model('user', userSchema);
module.exports = model;