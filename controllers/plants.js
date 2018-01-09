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

// Profile route
router.get('/', function(req, res){
	db.plant.findAll().then(function(plants){
		res.render('plants/all', {plants: plants});	
	});
});

router.post('/', function(req, res) {
	res.send('Added plant');
	console.log(req.body);
});

router.get('/:id', function(req, res){
	db.plant.findOne({
		where: {id: req.params.id},
		include: [db.tag]
	}).then(function(plant){
		res.render('plants/show', {plant: plant});
	});
});

module.exports = router;