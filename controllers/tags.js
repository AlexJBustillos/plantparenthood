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


// Adding tags to plants

// db.plant.findAll().then(function(plant){
// 	plant.forEach(function(plant){
// 		var plantName = JSON.stringify(plant.name).toLowerCase();
// 		var plantId = plant.id;
// 		var bonsai = plantName.includes('bonsai');
// 		if (bonsai){
// 			console.log(plant.name,'includes bonsai and ID is',plantId);
// 			db.plant.findOne({
// 				where: { id: plantId }
// 			}).then(function(plant, found){
// 				db.tag.findOrCreate({
// 					where: { content: 'bonsai' }
// 				}).spread(function(tag, found){
// 					plant.addTag(tag);
// 					console.log(tag,'added to',plant);
// 				});
// 			});
// 		} 
// 	});
// });


// var soilType = "6";
// var floweringPlantsArr = [];
// db.plant.findAll({where: { soil: soilType }}).then(function(data){
// 	for (var i = 1; i < data.length; i++) {
// 		console.log(data[i].id);
// 		var currentPlantId = data[i].id;
// 		floweringPlantsArr.push(currentPlantId);
// 	}
// 	console.log(floweringPlantsArr);

// 	for (var i = 0; i <= floweringPlantsArr.length; i++) {
// 		db.plant.findOrCreate({
// 		  where: {
// 		    id: floweringPlantsArr[i]
// 		  }
// 		}).spread(function(plant, created) {
// 		  db.tag.findOrCreate({
// 		    where: { content: "fern" }
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