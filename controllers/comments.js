require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

router.post('/', isLoggedIn, function(req, res){
	db.comment.create(req.body).then(function(createdComment){
		res.redirect('/plants/' + createdComment.plantId);
	});
});

router.delete('/:id', isLoggedIn, function(req, res){
  db.comment.destroy({
    where: { 
    	id: req.params.id,
    	userId: req.user.id
    }
  }).then(function(deleted){
    console.log(deleted,"is the info");
    res.send('We done did a delete');
  }).catch(function(err){
    console.log('An error happened', err);
    res.send('Fail');
  });
});

module.exports = router;