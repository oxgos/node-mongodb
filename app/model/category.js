const mongoose = require('mongoose')
const categorySchema = require('../schema/category')

const Category = mongoose.model('Category', categorySchema)

module.exports = Category