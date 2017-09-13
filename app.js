const request = require('request');

request({
    url: 'http://maps.googleapis.com/maps/api/geocode/json?address=1546%20HIghland%20Ave%20Berwyn%20IL',
    json: true
    }, (error, request, body) => {
        console.log(`Address: ${body.results[0].formatted_address}`);
});