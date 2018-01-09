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

	db.user_plant.findAll({
		where: {userId: req.user.id}
	}).then(function(ownedPlants){
		console.log(ownedPlants);
	})
		
	res.render('users/profile');
});



module.exports = router;