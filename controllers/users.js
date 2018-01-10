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

	db.user.findOne({
		where: {id: req.user.id},
		include: [db.plant]
	}).then(function(user){
		res.render('users/profile', {user: user});	
	});
});


module.exports = router;