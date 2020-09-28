const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4f457dd3d9d249610b144eabb77077bd&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log(body.current)
            callback(undefined, 'Tempareture is '+body.current.temperature+' and the Weather description is ' + body.current.weather_descriptions[0] )
        }
    })
}

module.exports = forecast






//body.daily.data[0].summary + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precipProbability + '% chance of rain.'