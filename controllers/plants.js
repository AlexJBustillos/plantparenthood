require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('../middleware/loggedin');
var session = require('express-session');
var passport = require('../config/passportConfig');
var db = require('../models');
var request = require('request');
var router = express.Router();

router.get('/', function(req, res){
	db.plant.findAll().then(function(plants){
		if(req.user){
			db.user.findOne({
				where: {id: req.user.id},
				include: [db.plant]
			}).then(function(user){
				console.log("found user");
				res.render('plants/all', {
					plants: plants,
					userPlants: user.plants,
				});	
				done();
			}).catch(function(err){
				console.log("no user found");
				res.render('plants/all', {
					plants: plants
				});
			})
		}
		else {
			res.render('plants/all', {plants: plants});	
		}
	}).catch(function(err){
		res.send(err);
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

router.post('/:id', isLoggedIn, function(req, res) {
	db.plant.findOne({
		where: {id: req.params.id}
	}).then(function(plant){
		if(plant){
			plant.addUser(req.user);
		}
	}).then(function(plantAdded){
		res.send("Added");
	}).catch(function(err){
		console.log('An error happened', err);
		res.send('Fail');
	});
});

router.delete('/:id', isLoggedIn, function(req, res){
	db.plant.findOne({
		where: {id: req.params.id}
	}).then(function(plant){
		console.log("found plant",plant);
		plant.removeUser(req.user);
		res.send("Deleted");
	}).catch(function(err){
		console.log('An error happened', err);
		res.send('Fail');
	})
});

router.get('/:id', function(req, res){

	var userPlants;

	db.plant.findOne({
		where: {id: req.params.id},
		include: [db.tag, db.user, db.comment]
	}).then(function(plant){
		if(req.user){
			db.user.findOne({
				where: {id: req.user.id},
				include: [db.plant]
			}).then(function(user){
				console.log("found user");
				res.render('plants/show', {
					plant: plant,
					userPlants: user.plants
				});
			}).catch(function(err){
				console.log("no user found");
				res.render('plants/show', {
					plant: plant
				});	
			})
		}
		else {
			res.render('plants/show', {
				plant: plant
			});
		}		
	}).catch(function(err){
		res.send(err);
	})
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