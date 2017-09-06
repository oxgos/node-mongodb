const express = require('express')
const router = express.Router()
const User = require('../model/user')

//list page
router.get('/admin/userlist', function(req, res) {
    User.fetch(function(err, users) {
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
router.delete('/admin/userlist', function(req, res) {
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
})

module.exports = router