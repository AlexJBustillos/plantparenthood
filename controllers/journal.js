require('dotenv').config();
var express = require('express');
var isLoggedIn = require('../middleware/loggedin');
var ejsLayouts = require('express-ejs-layouts');
var flash = require('connect-flash');
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
  db.journal.create(req.body).then(function(createdJournal){
    res.redirect('/users/journal');
  });
});

router.get('/new', isLoggedIn, function(req, res){
  db.user.findOne({
    where: {id: req.user.id},
    include: [db.journal]
  }).then(function(user){
    res.render('journal/new', {user: user});  
  });
});

router.get('/:id', isLoggedIn, function(req, res){
  db.journal.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id
    },
    include: [db.user]
  }).then(function(journal){
    res.render('journal/show', {journal: journal});
  });
});

router.get('/edit/:id', isLoggedIn, function(req, res){
  db.journal.findOne({
    where: {
      id: req.params.id,
      userId: req.user.id
    },
    include: [db.user]
  }).then(function(journal){
    res.render('journal/edit', {journal: journal})
  })
});

router.put('/:id', isLoggedIn, function(req, res){
  var newTitle = req.body.title;
  var newContent = req.body.content;
  db.journal.findOne({
    where: {
      id: req.body.id,
      userId: req.user.id
    }
  }).then(function(journal){
    journal.title = newTitle;
    journal.content = newContent;
    journal.save();
  }).then(function(journalUpdated){
    res.send('We have edited the journal');
  }).catch(function(err){
    console.log('An error happened',err);
    res.send('Fail');
  })
});

router.delete('/:id', isLoggedIn, function(req, res){
  db.journal.destroy({
    where: { 
      id: req.params.id,
      userId: req.user.id
    }
  }).then(function(deleted){
    res.send('We done did a delete');
  }).catch(function(err){
    console.log('An error happened', err);
    res.send('Fail');
  });
});


module.exports = router;