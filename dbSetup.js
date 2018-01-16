require('dotenv').config();
var express = require('express');
var db = require('./models');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();


for (var i = 229; i <= 456; i++) {
	var currentPlantId = i;
	db.plant.destroy({
    	where: { id: currentPlantId }
	}).then(function(deleted){
    	console.log("Plant deleted",deleted);
	});
}

module.exports = router;