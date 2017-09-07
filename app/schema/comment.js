const mongoose = require('mongoose');
const Schema = mongoose.Schema

// 获取ObjectId
const ObjectId = Schema.Types.ObjectId

const commentSchema = new Schema({
    movie: { type: ObjectId, ref: 'movies' },
    from: { type: ObjectId, ref: 'users' },
    to: { type: ObjectId, ref: 'users' },
    content: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

commentSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});

commentSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({ _id: id })
            .exec(cb)
    }
}

module.exports = commentSchema