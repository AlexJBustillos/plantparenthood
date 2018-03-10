var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');
var db = require('../models');


var authenticatedUser = request.agent(app);

before(function(done){
  authenticatedUser
    .post('/auth/login')
    .set('content-type', 'application/x-www-form-urlencoded')
    .send({email: 'test@testing.com'})
    .send({password: 'test123'})
    .end(function(err, response){
      expect(response.statusCode).to.equal(302);
      expect('Location', '/users/profile');
      done();
    });
});

describe('GET /', function() {
  it('should return a 200 response', function(done) {
    request(app).get('/')
    .expect(200, done);
  });
});

describe('GET /plants', function() {
  it('/plants should return 200', function(done) {
    request(app).get('/plants')
    .expect(200, done);
  });
   it('/notfound should return a 200 response', function(done) {
    request(app).get('/plants/notfound')
    .expect(200, done);
  });
   it('/search should return a 302 response and redirect to plant page', function(done) {
    request(app).get('/plants/search').query({id: 5})
	.expect('Location', '/plants/5')
    .expect(302, done);
  });
  it('/:id should return a 202 response', function(done) {
    request(app).get('/plants/3')
    .expect(200, done);
  });
});


describe('GET /users', function(done){
  it('/profile should return a 200 response if logged in', function(done){
    authenticatedUser.get('/users/profile')
    .expect(200, done);
  });
  it('/profile should return 302 and redirect if not logged in', function(done){
    request(app).get('/users/profile')
    .expect('Location', '/auth/login')
    .expect(302, done);
  });
  it('/profilepic should return a 200 response if logged in', function(done){
    authenticatedUser.get('/users/profilepic')
    .expect(200, done);
  });
  it('/profilepic should return 302 and redirect if not logged in', function(done){
    request(app).get('/users/profilepic')
    .expect('Location', '/auth/login')
    .expect(302, done);
  });
  it('/plants should return a 200 response if logged in', function(done){
    authenticatedUser.get('/users/plants')
    .expect(200, done);
  });
  it('/plants should return 302 and redirect if not logged in', function(done){
    request(app).get('/users/plants')
    .expect('Location', '/auth/login')
    .expect(302, done);
  });
});

describe('GET /auth', function() {
  it('/signup should return a 200 response', function(done) {
    request(app).get('/auth/signup')
    .expect(200, done);
  });
  it('/login should return a 200 response', function(done) {
    request(app).get('/auth/login')
    .expect(200, done);
  });
});


