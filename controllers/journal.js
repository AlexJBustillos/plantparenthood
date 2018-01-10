require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
var isLoggedIn = require('../middleware/IsLoggedIn');
var session = require('express-session');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

router.get('/', isLoggedIn, function(req, res){
  db.user.findOne({
    where: {id: req.user.id},
    include: [db.journal]
  }).then(function(user){
    res.render('journal/all', {user: user});  
  });
});

router.post('/', isLoggedIn, function(req, res){
  // console.log(req.body);
  // res.send('Journal post route stub');
  db.journal.create(req.body).then(function(createdJournal){
    res.redirect('/');
  });
});

router.get('/new', isLoggedIn, function(req, res){
  db.user.findOne({
    where: {id: req.user.id},
    include: [db.plant, db.journal]
  }).then(function(user){
    res.render('journal/new', {user: user});  
  });
});


module.exports = router;