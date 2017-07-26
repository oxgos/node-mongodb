var mongoose = require('mongoose');
var schema = require('../schema/movie');

var Movie = mongoose.model('Moive', schema);

module.exports = Movie;