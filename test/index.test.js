var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');
var db = require('../models');

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
   it('/search should return a 302 response', function(done) {
    request(app).get('/plants/search')
    .type('form')
		.send({
			id: 5
		})
    .expect(302, done);
  });
  it('/:id should return a 202 response', function(done) {
    request(app).get('/plants/3')
    .expect(200, done);
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

// describe('POST /auth', function(){
// 	it('/signup post should create a new user and redirect to /profile after', function(done){
// 		request(app).post('/auth/signup')
// 		.type('form')
// 		.send({
// 			name: 'Test User',
// 			email: 'testing123@test.com',
// 			password: 'Testing123'
// 		})
// 		.expect('Location', '/users/profile')
// 		.expect(302, done);
// 	});
// });

