const express = require('express')
const router = express.Router()
const User = require('../model/user')

// signin
router.post('/user/signin', (req, res) => {
    let _user = req.body.user
    let name = _user.name
    let password = _user.password

    User.findOne({ name: name }, (err, user) => {
        if (err) {
            console.log(err)
        }
        if (!user) {
            return res.redirect('/')
        }
        // 注意，这里是调用实例的方法，所以是user,而不是User构造函数对象
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                console.log(err)
            }

            if (isMatch) {
                req.session.user = user
                return res.redirect('/')
            } else {
                console.log('Password is not matched')
            }
        })
    })
})

// signup
router.post('/user/signup', (req, res) => {
    // req.param('user)
    let _user = req.body.user

    User.find({ name: _user.name }, (err, user) => {
        if (err) {
            console.log(err)
        }

        if (user) {
            return res.redirect('/')
        } else {
            let user = new User(_user)

            user.save((err, user) => {
                if (err) {
                    console.log(err)
                }
                // console.log(user)
            })
            res.redirect('/admin/userlist')
        }
    })
})

// logout
router.get('/logout', (req, res) => {
    delete req.session.user
    res.redirect('/')
})

module.exports = router