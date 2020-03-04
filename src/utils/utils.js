const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYmhhdmFuYWtvbW1pbmVuaSIsImEiOiJjazdiaW5ndTMxZXc2M2xvNXY5MHVndzlhIn0.8JkofmyA3bm0oSgJQTBbWQ"
    // console.log(url);
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to coonect to the location")
        } else if (body.features.length === 0) {
            callback("Unable to find location, Please try with other location")
        } else {
            callback(undefined, ({
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }));
        }
    })
}

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/58512565c503808c914280bb2ba8e494/'+ encodeURIComponent(latitude) +','+ encodeURIComponent(longitude) + '?units=ca'
    // console.log(url)
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to the Weather Service')
        } else if(body.error){
            callback('Unable to find the location, Please try with another')
        } else{
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
            // callback(undefined, ({
            //     Temperature: body.currently.temperature,
            //     Rain_Prob: body.currently.precipProbability
            // }))
        }
    })
}

module.exports = {
    geocode: geocode,
    forecast:forecast
}