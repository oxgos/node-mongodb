const express = require('express')
const router = express.Router()
const Movie = require('../app/model/movie')
const Comment = require('../app/model/comment')
const { signinRequired } = require('../middleware/auth')

// 获取请求参数
router.param('id', function(req, res, next, id) {
    next()
})

// 电影详情页
router.get('/movie/:id', (req, res) => {
    let id = req.params.id;
    Movie.findById(id, (err, movie) => {
        if (err) {
            console.log(err)
        }

        Comment.find({ movie: id })
            .populate('from', 'name')
            .populate('reply.from reply.to', 'name')
            .exec().then((comments) => {
                console.log(comments)
                res.render('detail', {
                    title: 'website ' + movie.title,
                    movie: movie,
                    comments: comments
                        /* movie: {
                    doctor: '何塞 帕迪里亚',
                    country: '美国',
                    title: '机械战警',
                    year: 2014,
                    poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5',
                    language: '英语',
                    flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
                    summary: '2028年，专事军火开发的机器人公司Omni Corp生产了大量装备精良的机械战警，他们被投入到维和和惩治犯罪等行动中，取得显著的效果。罪犯横行的底特律市，嫉恶如仇、正义感十足的警察亚历克斯·墨菲（乔尔·金纳曼饰）遭到仇家暗算，身体受到毁灭性破坏。借助于Omni公司天才博士丹尼特·诺顿（加里·奥德曼饰）最前沿的技术，墨菲以机械战警的形态复活。数轮严格的测试表明，墨菲足以承担起维护社会治安的重任，他的口碑在民众中直线飙升，而墨菲的妻子克拉拉（艾比·考尼什饰）和儿子大卫却再难从他身上感觉亲人的温暖。感知到妻儿的痛苦，墨菲决心向策划杀害自己的犯罪头子展开反击。'
                } */
                })
            })
    })
})

// comment
router.post('/user/comment', signinRequired, (req, res) => {
    let _comment = req.body.comment
    let movieId = _comment.movie

    if (_comment.cid) {
        Comment.findById(_comment.cid, (err, comment) => {
            let reply = {
                from: _comment.from,
                to: _comment.tid,
                content: _comment.content
            }

            comment.reply.push(reply)

            comment.save((err, comment) => {
                if (err) {
                    console.log(err)
                }

                res.redirect('/movie/' + movieId)
            })
        })
    } else {
        let comment = new Comment(_comment)

        comment.save((err, comment) => {
            if (err) {
                console.log(err)
            }

            res.redirect('/movie/' + movieId)
        })
    }
})

module.exports = router