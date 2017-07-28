var mongoose = require('mongoose');
var schema = require('../schema/movie');

var Movie = mongoose.model('movie', schema);


module.exports = Movie;