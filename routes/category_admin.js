var express = require('express')
var router = express.Router()
var Category = require('../app/model/category')
var { signinRequired, adminRequired } = require('../middleware/auth')

router.use(signinRequired, adminRequired)

//admin page后台分类录入页
router.get('/admin/category/new', (req, res) => {
    res.render('category_admin', {
        title: 'website 后台分类录入页',
        category: {
            name: ''
        }
    })
})

//admin category后台电影分类录入页
router.post('/admin/category', (req, res) => {
    let _category = req.body.category
    let category = new Category(_category)

    category.save((err, category) => {
        if (err) {
            console.log(err)
        }

        res.redirect('/admin/category/list')
    })
})

//category 分类列表页
router.get('/admin/category/list', (req, res) => {
    Category.fetch((err, categories) => {
        res.render('categorylist', {
            title: '分类列表页',
            categories: categories
        })
    })
})

module.exports = router