const mongoose = require('mongoose')
const movieSchema = require('../schema/movie')

// 如不加第三个参数，mongodb自动生动collection名称为第一个参数(小写)加s
// 第三参数可强制命名
// const Movie = mongoose.model('movie', movieSchema, 'movie')
const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie