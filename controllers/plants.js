require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('../middleware/loggedin');
var session = require('express-session');
var passport = require('../config/passportConfig');
var db = require('../models');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

router.get('/', function(req, res){
	db.plant.findAll({
		include: [db.tag]
	}).then(function(plants){
		res.render('plants/all', {plants: plants});	
	});
});

router.get('/notfound', function(req, res){
	res.render('plants/notfound');	
});

router.get('/search', function(req, res){
	db.plant.findAll({
		where: { id: req.query.id }
	}).then(function(plants){
		res.redirect('/plants/' + req.query.id);
	}).catch(function(err){
		res.redirect('/plants/notfound');
	})
});

router.post('/', isLoggedIn, function(req, res) {
	db.plant.findOne({
		where: {id: req.body.id}
	}).then(function(plant){
		if(plant){
			plant.addUser(req.user);
		}
	}).then(function(plantAdded){
		res.redirect('/users/plants');
	}).catch(function(err){
		console.log('An error happened', err);
		res.send('Fail');
	});
});

router.delete('/:id', isLoggedIn, function(req, res){
	console.log('Delete route reached');
	db.plant.findOne({
		where: {id: req.params.id}
	}).then(function(plant){
		if(plant){
			plant.removeUser(req.user);
		}
	}).then(function(plantDeleted){
		res.send('Plant deleted');
	}).catch(function(err){
		console.log('An error happened', err);
		res.send('Fail');
	})
});

router.get('/:id', function(req, res){
	db.plant.findOne({
		where: {id: req.params.id},
		include: [db.tag, db.user, db.comment]
	}).then(function(plant){
		res.render('plants/show', {plant: plant});
	});
});

// The below is a work in progress, deciding the way I want to filter
// router.get('/filter', function(req, res){
// 	if (req.query.water && req.query.light) {	
// 		db.plant.findAll({
// 			where: { 
// 				water: req.query.water,
// 				light:  req.query.light
// 			}
// 		}).then(function(plants){
// 			res.render('plants/all', {plants: plants});	
// 		}).catch(function(err){
// 			console.log('Plants not found');
// 		})
// 	} else if (req.query.water) {
// 		db.plant.findAll({
// 			where: { 
// 				water: req.query.water
// 			}
// 		}).then(function(plants){
// 			res.render('plants/all', {plants: plants});	
// 		}).catch(function(err){
// 			console.log('Plants not found');
// 		})
// 	} else if (req.query.light) {
// 		db.plant.findAll({
// 			where: { 
// 				light:  req.query.light
// 			}
// 		}).then(function(plants){
// 			res.render('plants/all', {plants: plants});	
// 		}).catch(function(err){
// 			console.log('Plants not found');
// 		})
// 	}
// });


module.exports = router;