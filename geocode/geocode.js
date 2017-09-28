const request = require('request');

var geocodeAddress = (address, callback) => {
    request({
    url: 'http://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address),
    json: true
    }, (error, request, body) => {
        if (error) {
            callback('Unable to connect to google servers');
        } else if ((body.status === 'ZERO_RESULTS') || (body.status === 'INVALID_REQUEST')) {
            callback('Unable to find that address');
        } else if (body.status === 'OK'){
            callback(undefined, {
              address: body.results[0].formatted_address,
              latitude : body.results[0].geometry.location.lat,
              longitude: body.results[0].geometry.location.lng
            });
        }
       
    });
};

module.exports.geocodeAddress = geocodeAddress;