const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();

const index = require('./routes/index')
const detail = require('./routes/detail')
const admin = require('./routes/admin')
const list = require('./routes/list')

mongoose.Promise = global.Promise;  
const db = mongoose.connect('mongodb://localhost/website', {useMongoClient: true});

app.set('views', './views/pages');
app.set('view engine', 'pug');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.listen(port);

console.log('web started on port ' + port);

//index page
app.use('/', index)

//detail page
app.get('/movie/:id', detail)

//admin page
app.get('/admin/movie', admin)

//admin update movie
app.get('/admin/update/:id', admin)

//admin post movie
app.post('/admin/movie/new', admin)

//list page
app.get('/admin/list', list)

//list delete movie
app.delete('/admin/list', list)