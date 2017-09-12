const express = require('express')
const router = express.Router()
const Movie = require('../app/model/movie')
const Category = require('../app/model/Category')

//index page
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

module.exports = router