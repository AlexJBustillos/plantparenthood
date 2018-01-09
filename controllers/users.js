require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('../middleware/IsLoggedIn');
var session = require('express-session');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

// Profile route
router.get('/profile', isLoggedIn, function(req, res){

	var user = req.user;

	user.getPlant().then(function(plants){
		console.log(plants);
	});

		
	res.render('users/profile');
});



module.exports = router;