const express = require('express')
const router = express.Router()
const Movie = require('../app/model/movie')
const _ = require('underscore')
const { signinRequired, adminRequired } = require('../middleware/auth')

// 路径可以用正则表达式匹配
// router.use(/^\/admin/, signinRequired, adminRequired)
// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
router.use(signinRequired, adminRequired)

router.param('id', function(req, res, next, id) {
    next()
})

//admin page后台电影录入页
router.get('/admin/movie/new', function(req, res) {
    res.render('admin', {
        title: 'website 后台录入页',
        movie: {
            title: '',
            doctor: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    })
})


//admin post movie后台电影添加页
router.post('/admin/movie/new', function(req, res) {
    // console.log(req.body);
    // console.log(typeof req.body);
    let id = req.body.movie._id;
    let movieObj = req.body.movie;
    let _movie;

    if (id !== 'undefined') {
        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj);

            _movie.save(function(err, movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            })
        })

    } else {
        _movie = new Movie({
            doctor: movieObj.doctor,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            flash: movieObj.flash,
            summary: movieObj.summary
        });

        _movie.save(function(err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect('/movie/' + movie._id);
        })
    }
})

// 获取请求参数
router.param('id', function(req, res, next, id) {
    next()
})

//admin update movie后台电影更新页
router.get('/admin/movie/update/:id', function(req, res) {
    let id = req.params.id;

    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: 'imooc 后台更新页',
                movie: movie
            })
        })
    }
})


//list page电影列表页
router.get('/admin/movie/list', function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }

        res.render('list', {
            title: 'website 列表页',
            movies: movies
                /* movies: [{
			title: '机械战警',
			_id: 1,
			doctor: '何塞 帕迪里亚',
			country: '美国',
			year: 2014,
			language: '英语',
			flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			summary: '2028年，专事军火开发的机器人公司Omni Corp生产了大量装备精良的机械战警，他们被投入到维和和惩治犯罪等行动中，取得显著的效果。罪犯横行的底特律市，嫉恶如仇、正义感十足的警察亚历克斯·墨菲（乔尔·金纳曼饰）遭到仇家暗算，身体受到毁灭性破坏。借助于Omni公司天才博士丹尼特·诺顿（加里·奥德曼饰）最前沿的技术，墨菲以机械战警的形态复活。数轮严格的测试表明，墨菲足以承担起维护社会治安的重任，他的口碑在民众中直线飙升，而墨菲的妻子克拉拉（艾比·考尼什饰）和儿子大卫却再难从他身上感觉亲人的温暖。感知到妻儿的痛苦，墨菲决心向策划杀害自己的犯罪头子展开反击。'
		}] */
        })
    })
})

//list delete movie电影删除
router.delete('/admin/movie/list', function(req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({ _id: id }, function(err, moive) {
            if (err) {
                console.log(err);
            } else {
                res.json({ success: 1 });
            }
        })
    }
})

module.exports = router