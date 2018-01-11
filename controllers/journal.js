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
    res.redirect('/users/journal');
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

router.delete('/:id', isLoggedIn, function(req, res){
  db.journal.destroy({
    where: { id: req.params.id }
  }).then(function(deleted){
    res.send('We done did a delete');
  }).catch(function(err){
    console.log('An error happened', err);
    res.send('Fail');
  });
});


module.exports = router;