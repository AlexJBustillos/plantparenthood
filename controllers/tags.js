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
router.get('/', function(req, res){
	res.send('Tags route');
});


// DB Tag creation

// db.plant.findOrCreate({
// 	where: { id: 5 }
// }).spread(function(plant, found){
// 	db.tag.findOrCreate({
// 		where: { content: "dog-friendly" }
// 	}).spread(function(tag, added){
// 		plant.addTag(tag).then(function(tag){
// 			console.log(tag,"added to",plant);
// 		});
// 	});
// });

// db.tag.findOrCreate({
// 	where: {
// 		content: "dog-friendly"
// 	}
// })
// db.tag.findOrCreate({
// 	where: {
// 		content: "cat-friendly"
// 	}
// });
// db.tag.findOrCreate({
// 	where: {
// 		content: "palm"
// 	}
// });
// db.tag.findOrCreate({
// 	where: {
// 		content: "cactus"
// 	}
// });
// db.tag.findOrCreate({
// 	where: {
// 		content: "flowering"
// 	}
// });
// db.tag.findOrCreate({
// 	where: {
// 		content: "ivy"
// 	}
// });
// db.tag.findOrCreate({
// 	where: {
// 		content: "fern"
// 	}
// });
// db.tag.findOrCreate({
// 	where: {
// 		content: "succulent"
// 	}
// });
// db.tag.findOrCreate({
// 	where: {
// 		content: "good for beginners"
// 	}
// });

module.exports = router;