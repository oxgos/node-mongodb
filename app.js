const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const mongoStore = require('connect-mongo')(session)
const bodyParser = require('body-parser')
const morgan = require('morgan')

const port = process.env.PORT || 3000
const app = express();

// 路由引入
const index = require('./routes/index')
const detail = require('./routes/detail')
const admin = require('./routes/admin')
const list = require('./routes/list')
const userlist = require('./routes/userlist')
const usersign = require('./routes/usersign')

// 连接数据库，PS:localhost/后面的是创建的数据库名称
const dbUrl = 'mongodb://localhost/website'
mongoose.Promise = global.Promise
mongoose.connect(dbUrl, { useMongoClient: true })

// 设置视图相关路径和模板引擎
app.set('views', './views/pages')
app.set('view engine', 'pug')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// secret用于防止篡改cookie
app.use(session({
    secret: 'imooc',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: true
}))

// 开发环境下，显示相关日志功能
if ('development' === app.get('env')) {
    // 错误信息打印
    app.set('showStackError', true)

    // 打印请求方法，地址，状态
    app.use(morgan(':method :url :status'))

    // 网页源码正常显示(非压缩后)
    app.locals.pretty = true

    // 数据库读取信息显示
    mongoose.set('debug', true)
}

app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.listen(port);

console.log('web started on port ' + port);

// 在所有路由前，增加中间件，把session里的user放到locals（本地），每个页面都能渲染user
app.use((req, res, next) => {
    let _user = req.session.user

    if (_user) {
        res.locals.user = _user
    }
    next()
})

// index page首页
app.use('/', index)

// user signin登陆
app.post('/user/signin', usersign)

// user signup注册
app.post('/user/signup', usersign)

// user logout注销
app.get('/logout', usersign)

// detail page电影详情
app.get('/movie/:id', detail)

// admin page后台管理电影
app.get('/admin/movie', admin)

// admin update movie后台电影更新
app.get('/admin/update/:id', admin)

// admin post movie后台添加电影
app.post('/admin/movie/new', admin)

// userlist page后台用户列表页
app.get('/admin/userlist', userlist)

// list delete user后台
// app.delete('/admin/userlist', userlist)

// list page后台电影列表
app.get('/admin/list', list)

// list delete movie后台电影删除
app.delete('/admin/list', list)