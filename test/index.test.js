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

// describe('GET /plants', function() {
//   it('should return a plants page', function(done) {
//     request(app).get('/plants')
//     .expect('Location', '/plants')
//     .expect(302, done);
//   });
// });

describe('GET /plants/notfound', function() {
  it('should return a 200 response', function(done) {
    request(app).get('/plants/notfound')
    .expect(200, done);
  });
});

describe('GET /plants/search', function() {
  it('should return a 302 response', function(done) {
    request(app).get('/plants/search')
    .type('form')
		.send({
			id: 5
		})
    .expect(302, done);
  });
});