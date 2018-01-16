require('dotenv').config();
var express = require('express');
var db = require('./models');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

// TO DO:
// Make these dryer, use async to make db easier to setup in one go

// STEP 1 FOR SCRAPING PLANT CARE DATA
// Remove comments from below to scrape all plant care rankings from UGA and input into db
// TO DO: Need more hooks here to fix some typos and overly long names from original data source

// request('http://extension.uga.edu/publications/detail.html?number=B1318', function(error, response, data){
// 	var $ = cheerio.load(data);

// 	for (var i = 4; i <= 231; i++) {
// 		var plantRow = 'body > main > div > div.large-8.columns.pub > table:nth-child(179) > tbody > tr:nth-child(';
// 		var botanicalName = $(plantRow + i +') > td:nth-child(1)').text();
// 		var commonName = $(plantRow + i +') > td:nth-child(2)').text();
// 		var light = $(plantRow + i +') > td:nth-child(3)').text();
// 		var temperature = $(plantRow + i +') > td:nth-child(4)').text();
// 		var humidity = $(plantRow + i +') > td:nth-child(5)').text();
// 		var water = $(plantRow + i +') > td:nth-child(6)').text();
// 		var soil = $(plantRow + i +') > td:nth-child(7)').text();
// 		db.plant.create({
// 			name: commonName,
// 			botanicalName: botanicalName,
// 			light: light,
// 			temperature: temperature,
// 			humidity: humidity,
// 			water: water,
// 			soil: soil
// 		});
// 	}
// });

// STEP 2 - FOR INPUTTING IMAGES
// Remove comments from below and run this
// May want to run for botanicalName and name to get maximum results

// for (var i = 1; i <= 227; i++) {
// 	db.plant.findOne({
// 		where: {id: i}
// 		}).then(function(plant){
// 			request('https://en.wikipedia.org/wiki/' + plant.botanicalName, function(error, response, data){
// 			var $ = cheerio.load(data);
// 			var imageSrc = $('#mw-content-text > div > table.infobox.biota > tbody > tr:nth-child(2) > td > a > img').attr('src');
// 			if (imageSrc && !plant.imageUrl){
// 				plant.imageUrl = 'http:' + imageSrc;
// 				plant.save();
// 				console.log(plant.name,"image url is",plant.imageUrl);
// 			}

// 		});
// 	});
// }

// The below was used when I had weird dupes in the db
// for (var i = 229; i <= 456; i++) {
// 	var currentPlantId = i;
// 	db.plant.destroy({
//     	where: { id: currentPlantId }
// 	}).then(function(deleted){
//     	console.log("Plant deleted",deleted);
// 	});
// }

// STEP 3 - FOR CREATING TAGS
// Do this AFTER creating plant database
// Remove comments and run the below once to generate initial tags

// db.tag.findOrCreate({
// 	where: {
// 		content: 'palm'
// 	}
// });
// db.tag.findOrCreate({
// 	where: {
// 		content: 'cactus & succulent'
// 	}
// });
// db.tag.findOrCreate({
// 	where: {
// 		content: 'flowering'
// 	}
// });
// db.tag.findOrCreate({
// 	where: {
// 		content: 'ivy'
// 	}
// });
// db.tag.findOrCreate({
// 	where: {
// 		content: 'fern'
// 	}
// });
// db.tag.findOrCreate({
// 	where: {
// 		content: 'orchid'
// 	}
// });
// db.tag.findOrCreate({
// 	where: {
// 		content: 'foliage'
// 	}
// });
// db.tag.findOrCreate({
// 	where: {
// 		content: 'bromeliad'
// 	}
// });


// STEP 4 - Add tags to plants
// Remove comments from below to loop through
// Since currently you have to make manual changes in this function

var addTags = function(tagName) {
	db.plant.findAll().then(function(plant){
		plant.forEach(function(plant){
			var plantName = JSON.stringify(plant.name).toLowerCase();
			var plantId = plant.id;
			var addPlantTag = plantName.includes(tagName);
			if (addPlantTag){
				console.log(plant.name,'includes'+ tagName +'and ID is',plantId);
				db.plant.findOne({
					where: { id: plantId }
				}).then(function(plant, found){
					db.tag.findOrCreate({
						where: { content: tagName }
					}).spread(function(tag, found){
						plant.addTag(tag);
						console.log(tag,'added to',plant);
					});
				});
			} 
		});
	});
}

// addTags('palm');
addTags('ivy');
// addTags('fern');
// addTags('orchid');
// addTags('bromeliad');

// STEP 5 - Use soil types to loop through and add more tags
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