var weather = require('weather-js');
 
// Options:
// search:     location name or zipcode
// degreeType: F or C
 
weather.find({search: 'Tuticorin', degreeType: 'F'}, function(err, result) {
  if(err) console.log(err);
  var weatherData = {}
 weatherData = result;
 var temp = Math.floor((((weatherData[0].current.temperature) - 32) * 5/9));
  console.log(temp);
});




