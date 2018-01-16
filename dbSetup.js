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


for (var i = 229; i <= 456; i++) {
	var currentPlantId = i;
	db.comment.destroy({
    	where: { id: currentPlantId }
	}).then(function(deleted){
    	console.log("Plant deleted",deleted);
	});
}

module.exports = router;