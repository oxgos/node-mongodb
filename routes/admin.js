const express = require('express')
const router = express.Router()
const Movie = require('../model/movie')
const _ = require('underscore');

//admin page
router.get('/admin/movie', function(req, res) {
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
router.param('id', function(req, res, next, id) {
	next()
})
//admin update movie
router.get('/admin/update/:id', function(req, res) {
	let id = req.params.id;

	if(id) {
		Movie.findById(id, function(err, movie) {
			res.render('admin', {
				title: 'imooc 后台更新页',
				movie: movie
			})
		})
	}
})
//admin post movie
router.post('/admin/movie/new', function(req, res) {
	// console.log(req.body);
	// console.log(typeof req.body);
	let id = req.body.movie._id;
	let movieObj = req.body.movie;
	let _movie;

	if(id !== 'undefined') {
		Movie.findById(id, function(err, movie) {
			if(err) {
				console.log(err);
			}
			_movie = _.extend(movie, movieObj);

			_movie.save(function(err, movie) {
				if(err) {
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
			if(err) {
				console.log(err);
			}
			res.redirect('/movie/' + movie._id);
		})
	}
})

module.exports = router