const mongoose = require('mongoose')
const commentSchema = require('../schema/comment')

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment