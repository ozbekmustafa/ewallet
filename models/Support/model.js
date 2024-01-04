var supportSchema = require('./schema.js'),
    mongoose = require('mongoose');

var model = mongoose.model('support', supportSchema);
module.exports = model;