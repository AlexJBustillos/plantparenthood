var geocoder = require('geocoder');
geocoder.geocode('98103', function(err, data) {
  console.log(data.results[0].geometry.location);
});