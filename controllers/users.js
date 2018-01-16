require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('../middleware/loggedin');
var session = require('express-session');
var passport = require('../config/passportConfig');
var db = require('../models');
var multer = require('multer');
var cloudinary = require('cloudinary');
var upload = multer({ dest: './uploads/' });
var router = express.Router();

// Profile route
router.get('/profile', isLoggedIn, function(req, res){	
	db.user.findOne({
		where: {id: req.user.id},
		include: [db.plant, db.journal]
	}).then(function(user){
		res.render('users/profile', {user: user});	
	});
});

// Uploading profile picture
router.get('/profilepic', isLoggedIn, function(req, res){	
	db.user.findOne({
		where: {id: req.user.id}
	}).then(function(user){
		res.render('users/profilepic', {user: user});	
	});
});

// Post route for profile picture
router.post('/profilepic', isLoggedIn, upload.single('profilePic'), function(req, res) {
	cloudinary.uploader.upload(req.file.path, function(result) {
	  	var newImage = result.url;

	  	console.log(result);

	  	db.user.findOne({
	  		where: { id: req.user.id }

	  	}).then(function(user){
	  		user.userImg = newImage;
	  		user.save();

		}).then(function(photoUploaded){

	  		db.comment.findAll({
	  			where: { userId: req.user.id }
	  		}).then(function(comment){
	  			comment.forEach(function(comment){
	  				if(comment.imageUrl){
	  					comment.imageUrl = newImage;
	  					comment.save();
	  				}
	  			});
	  		});
	  	}).then(function(photoUpdated){
	  		res.redirect('/users/profile');

	  	}).catch(function(err){
	  		console.log('An error happened', err);
	  		res.send('Fail');
	  	});
	});
});

// User's plant collection
router.get('/plants', isLoggedIn, function(req, res){	
	db.user.findOne({
		where: {id: req.user.id},
		include: [db.plant]
	}).then(function(user){
		res.render('users/plants', {user: user});	
	});
});

// For updating the last watered date on profile
router.post('/lastwatered', isLoggedIn, function(req, res) {
	var lastWatered = req.body.lastWatered;
	db.user.findOne({
		where: {id: req.body.id}
	}).then(function(user){
		user.lastWatered = lastWatered;
		user.save();
	}).then(function(dateUpdated){
		res.redirect('/users/profile');
	}).catch(function(err){
		console.log('An error happened', err);
		res.send('Fail');
	});
});


module.exports = router;