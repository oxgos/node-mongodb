const express = require('express')
const router = express.Router()
const User = require('../app/model/user')

// 引入中间件，方法用exports暴露
const { signinRequired, adminRequired } = require('../middleware/auth')

// signin page
router.get('/signin', (req, res) => {
    res.render('signin', {
        title: '用户登陆页'
    })
})

// signup page
router.get('/signup', (req, res) => {
    res.render('signup', {
        title: '用户注册页'
    })
})

// signin
router.post('/user/signin', (req, res) => {
    let _user = req.body.user
    let name = _user.name
    let password = _user.password

    User.findOne({ name: name }, (err, user) => {
        console.log(req.to)
        if (err) {
            console.log(err)
        }
        if (!user) {
            return res.redirect('/signup')
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
                return res.redirect('/signin')
            }
        })
    })
})

// signup
router.post('/user/signup', (req, res) => {
    // req.param('user)
    let _user = req.body.user

    User.findOne({ name: _user.name }, (err, user) => {
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

//userlist page
router.get('/admin/user/list', signinRequired, adminRequired, (req, res) => {
    User.fetch((err, users) => {
        if (err) {
            console.log(err);
        }

        res.render('userlist', {
            title: 'website 用户列表页',
            users: users
        })
    })
})

//list delete user
/* router.delete('/admin/userlist', function(req, res) {
    var id = req.query.id;
    if (id) {
        User.remove({ _id: id }, function(err, user) {
            if (err) {
                console.log(err);
            } else {
                res.json({ success: 1 });
            }
        })
    }
}) */

// middleware for user

module.exports = router