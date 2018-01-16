require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('../middleware/loggedin');
var session = require('express-session');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

router.get('/', function(req, res){
	db.tag.findAll({
		include: [db.plant]
	}).then(function(tag){
		res.render('tags/all', {tag: tag});	
	});
});

router.get('/:id', function(req, res){
	db.tag.findOne({
		where: { id: req.params.id },
		include: [db.plant]
	}).then(function(tag){
		res.render('tags/show', {tag: tag});	
	});
});


module.exports = router;