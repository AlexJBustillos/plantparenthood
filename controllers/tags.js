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

// STEP 1 FOR CREATING TAGS
// Do this AFTER creating plant database
// Remove comments and run the below once to generate initial tags

// Creating tags
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


// STEP 2 - Add tags to plants
// Remove comments from below to loop through
// TO DO - Make more dry so I can re-use this more easily for more plant types
// Since currently you have to make manual changes in this function

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


// STEP 3 - Use soil types to loop through and add more tags
// TO DO - Make this more dry and reusable! Same as step 2 where you need to adjust manually

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


module.exports = router;