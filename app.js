var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var session = require('express-session')
var mongoStore = require('connect-mongo')(session)
var bodyParser = require('body-parser')
var morgan = require('morgan')

var port = process.env.PORT || 3001
var app = express()

// 路由引入
var index = require('./routes/index')
var movie = require('./routes/movie')
var user = require('./routes/user')
var admin = require('./routes/admin')
var category = require('./routes/category_admin')

// 连接数据库，PS:localhost/后面的是创建的数据库名称
var env = process.env.NODE_ENV || 'development'
var dbUrl = 'mongodb://admin_gjw:Dodi880125$@127.0.0.1:19999/website'

if (env === 'development') {
    var dbUrl = 'mongodb://localhost/website'
}

mongoose.Promise = global.Promise
mongoose.connect(dbUrl, { useMongoClient: true })

// 设置视图相关路径和模板引擎
app.set('views', './app/views/pages')
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

    res.locals.user = _user

    next()
})

// index page首页路由
app.use('/', index)

// user 用户相关路由
app.use('/', user)

// movie 电影相关路由
app.use('/', movie)

// admin 后台管理相关路由
app.use('/', admin)

// category_admin 后台分类管理相关路由
app.use('/', category)