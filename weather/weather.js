const request = require('request');

var getWeather = (latitude, longitude, callback) => request({
    url: `https://api.darksky.net/forecast/470eb2b80cb0f130390e760dfb76f68e/${latitude},${longitude}`,
    json: true
}, (error, response, body) => {
    if (error) {
       callback('unable to connect to Forcast.io server');
    } else if (response.statusCode == 400) {
        callback('Unable to fetch weather');
    } else {
        callback(undefined, {
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
        });
    }
});

module.exports.getWeather = getWeather;