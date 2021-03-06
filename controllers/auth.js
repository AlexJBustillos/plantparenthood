var express = require('express');
var isLoggedIn = require('../middleware/loggedin');
var passport = require('../config/passportConfig');
var db = require('../models');
var router = express.Router();

// Login form page
router.get('/login', function(req, res){
	res.render('auth/login');
});

// Where login form data gets sent
router.post('/login', passport.authenticate('local', {
	successRedirect: '/users/profile',
	successFlash: 'Login successful',
	failureRedirect: '/auth/login',
	failureFlash: 'Username or password is incorrect'
}));

// Signup form page
router.get('/signup', function(req, res){
	res.render('auth/signup');
});

// Where signup form data gets sent
router.post('/signup', function(req, res, next){
	db.user.findOrCreate({
		where: { email: req.body.email },
		defaults: {
			name: req.body.name,
			password: req.body.password
		}
	}).spread(function(user, wasCreated){
		if(wasCreated){
			//Good job, you didnt make a duplicate and youre in the db
			passport.authenticate('local', {
				successRedirect: '/users/profile',
				successFlash: 'Login successful'
			})(req, res, next);
		}
		else {
			// Bad job, you tried to make a dupe
			req.flash('error', 'Email already exists');
			res.redirect('/auth/login');
		}
	}).catch(function(err){
		req.flash('error', err.message);
		res.send(err);
		res.redirect('/auth/signup');
	});
});

// Logout page
router.get('/logout', function(req, res){
	// res.send('logout route coming soon');
	req.logout();
	req.flash('success', 'Successfully logged out');
	res.redirect('/');
});

module.exports = router;