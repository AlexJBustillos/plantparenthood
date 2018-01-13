require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('../middleware/loggedin');
var session = require('express-session');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

// Profile route
router.get('/', function(req, res){
	res.send('Tags route');
});


// Adding tags to plants

// db.plant.findAll().then(function(plant){
// 	plant.forEach(function(plant){
// 		var plantName = JSON.stringify(plant.name).toLowerCase();
// 		var plantId = plant.id;
// 		var addPlantTag = plantName.includes('palm');
// 		if (addPlantTag){
// 			console.log(plant.name,'includes palm and ID is',plantId);
// 			db.plant.findOne({
// 				where: { id: plantId }
// 			}).then(function(plant, found){
// 				db.tag.findOrCreate({
// 					where: { content: 'palm' }
// 				}).spread(function(tag, found){
// 					plant.addTag(tag);
// 					console.log(tag,'added to',plant);
// 				});
// 			});
// 		} 
// 	});
// });

// Flowering = scale 1, id = 2
// Foliage = scale 2, id = 9
// Bromeliads = scale 3, id = 11
// Orchids = scale 4, id = 8
// Succulents & cactus = scale 5, id = 10
// Ferns = scale 6, id = 4


// var soilType = "6";
// var plantsArr = [];

// db.plant.findAll({where: { soil: soilType }}).then(function(data){
// 	for (var i = 1; i < data.length; i++) {
// 		console.log(data[i].id);
// 		var currentPlantId = data[i].id;
// 		plantsArr.push(currentPlantId);
// 	}
// 	console.log(plantsArr);

// 	for (var i = 0; i <= plantsArr.length; i++) {
// 		db.plant.findOrCreate({
// 		  where: {
// 		    id: plantsArr[i]
// 		  }
// 		}).spread(function(plant, created) {
// 		  db.tag.findOrCreate({
// 		    where: { id: 4 }
// 		  }).spread(function(tag, created) {
// 		   		plant.addTag(tag).then(function(tag) {
// 		      console.log(tag, "added to", plant);
// 		    });
// 		  });
// 		});
// 	}
// });

// Creating tags

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
// 		content: "cactus & succulent"
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
// 		content: "low maintenance"
// 	}
// });
// db.tag.findOrCreate({
// 	where: {
// 		content: "orchid"
// 	}
// });
// db.tag.findOrCreate({
// 	where: {
// 		content: "foliage"
// 	}
// });
// db.tag.findOrCreate({
// 	where: {
// 		content: "bromeliad"
// 	}
// });

module.exports = router;