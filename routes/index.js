var express = require('express')
var router = express.Router()
var Movie = require('../app/model/movie')
var Category = require('../app/model/category')

//index page首页
router.get('/', function(req, res) {
    // let _user = req.session.user
    Category
        .find({})
        .populate({ path: 'movies', options: { limit: 5 } })
        .exec()
        .then((categories) => {
            res.render('index', {
                title: 'website 首页',
                categories: categories
            })
        })
        // Movie.fetch(function(err, movies) {
        //     if (err) {
        //         console.log(err)
        //     }

    //     res.render('index', {
    //         title: 'website 首页',
    //         movies: movies
    //             /* movies: [{
    // 		title: '机械战警',
    // 		_id: 1,
    // 		poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    // 	},{
    // 		title: '机械战警',
    // 		_id: 2,
    // 		poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    // 	},{
    // 		title: '机械战警',
    // 		_id: 3,
    // 		poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    // 	},{
    // 		title: '机械战警',
    // 		_id: 4,
    // 		poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    // 	},{
    // 		title: '机械战警',
    // 		_id: 5,
    // 		poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    // 	},{
    // 		title: '机械战警',
    // 		_id: 6,
    // 		poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
    // 	}] */
    //     })
    // })
})


// 分类详情页
router.get('/results', (req, res) => {
    // 每页显示的电影数量
    const count = 2

    // 分类的ID
    let catId = req.query.cat

    // 搜索内容
    let q = req.query.q

    // 第几页
    let page = parseInt(req.query.p, 10)

    // 忽略前面数据的个数
    let index = page * count

    // 总页数
    let totalPage

    if (catId) {
        // 先查这分类的所有电影个数，计算出总页数
        Category.findById(catId, (err, category) => {
            totalPage = Math.ceil(category.movies.length / count)
        })

        Category
            .findOne({ _id: catId })
            .populate({
                path: 'movies',
                select: 'title poster',
                options: {
                    limit: count, // 限制搜索的数量
                    skip: index // 忽略前面几个数据
                }
            })
            .exec()
            .then((category) => {
                console.log(category.movies.length)
                res.render('results', {
                    title: '结果列表页面',
                    keyword: category.name,
                    query: 'cat=' + catId,
                    currentPage: (page + 1), // 当前页,因为传入的page从0开始，所以加1
                    totalPage: totalPage, // 页数的总数
                    category: category
                })
            })
    } else {
        Movie
            .find({ title: new RegExp(q + '.*', 'i') })
            .exec()
            .then((movies) => {
                res.render('results', {
                    title: '结果列表页面',
                    keyword: q,
                    query: 'q=' + q,
                    movies: movies
                })
            })
    }
})

module.exports = router