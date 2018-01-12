require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('../middleware/IsLoggedIn');
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

router.post('/', isLoggedIn, function(req, res) {
	db.plant.findOne({
		where: {id: req.body.id}
	}).then(function(plant){
		if(plant){
			plant.addUser(req.user);
		}
	}).then(function(plantAdded){
		res.redirect('/users/profile');
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

// Used the below to scrape plant care data from UGA site and generate entries in DB:
// request('http://extension.uga.edu/publications/detail.html?number=B1318', function(error, response, data){
// 	var $ = cheerio.load(data);

// 	for (var i = 4; i <= 230; i++) {
// 		var plantRow = 'body > main > div > div.large-8.columns.pub > table:nth-child(179) > tbody > tr:nth-child(';
// 		var botanicalName = $(plantRow + i +') > td:nth-child(1)').text();
// 		var commonName = $(plantRow + i +') > td:nth-child(2)').text();
// 		var light = $(plantRow + i +') > td:nth-child(3)').text();
// 		var temperature = $(plantRow + i +') > td:nth-child(4)').text();
// 		var humidity = $(plantRow + i +') > td:nth-child(5)').text();
// 		var water = $(plantRow + i +') > td:nth-child(6)').text();
// 		var soil = $(plantRow + i +') > td:nth-child(7)').text();

// 		db.plant.create({
// 			name: commonName,
// 			botanicalName: botanicalName,
// 			light: light,
// 			temperature: temperature,
// 			humidity: humidity,
// 			water: water,
// 			soil: soil
// 		});
// 	}
// });

// Used the below to scrape wikipedia for plant images
// for (var i = 5; i <= 235; i++) {
// 	db.plant.findOne({
// 		where: {id: i}
// 		}).then(function(plant){
// 			request('https://en.wikipedia.org/wiki/' + plant.botanicalName, function(error, response, data){
// 			var $ = cheerio.load(data);
// 			var imageSrc = $('#mw-content-text > div > table.infobox.biota > tbody > tr:nth-child(2) > td > a > img').attr('src');
// 			if (imageSrc && !plant.imageUrl){
// 				plant.imageUrl = 'http:' + imageSrc;
// 				plant.save();
// 				console.log(plant.name,"image url is",plant.imageUrl);
// 			}

// 		});
// 	});
// }

module.exports = router;