const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const userSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    password: String,
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

userSchema.pre('save', function(next) {
    let user = this

    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
});
// methods是实例的方法
userSchema.methods = {
    comparePassword: function(_password, cb) {
        bcrypt.compare(_password, this.password, function(err, isMatch) {
            if (err) return cb(err)

            cb(null, isMatch)
        })
    }
}

// statics是模型对象可以调用的方法
userSchema.statics = {
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

module.exports = userSchema;