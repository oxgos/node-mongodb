var mongoose = require('mongoose');
var movieSchema = require('../schema/movie');

var Movie = mongoose.model('movie', movieSchema);


module.exports = Movie;