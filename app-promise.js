const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a : {
            demand: true,
            alias: 'address',
            description: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;
    
var endcodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `http://maps.googleapis.com/maps/api/geocode/json?address=${endcodedAddress}`;

axios.get(geocodeURL).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/470eb2b80cb0f130390e760dfb76f68e/${latitude},${longitude}`;
    console.log(response.data.results[0].formatted_address);
    
    return axios.get(weatherURL);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var temperatureMax = Math.ceil(response.data.daily.data[0].temperatureMax);
    var temperatureMin = Math.ceil(response.data.daily.data[0].temperatureMin);
    var chanceOfPercip = Math.ceil(response.data.daily.data[0].precipProbability);
    console.log(`It is currently ${temperature}. It feels like ${apparentTemperature}`);
    console.log(`The high for today is ${temperatureMax}\nThe low for today is ${temperatureMin}`);
    console.log(`${chanceOfPercip}% chance of rain`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND' || e.code === 'ETIMEOUT') {
        console.log('Unable to connect to API servers');
    } else {
        console.log(e.message);
    }
});
