require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('../middleware/IsLoggedIn');
var session = require('express-session');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

router.post('/', function(req, res){
	// console.log(req.body);
	// res.send('comments post route stub');
	db.comment.create(req.body).then(function(createdComment){
		res.redirect('/plants/' + createdComment.plantId);
	});
});

module.exports = router;