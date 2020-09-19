const request = require('postman-request')


const forecast = (latitude, longitude, units, callback) => {
    const location = latitude + ',' + longitude
    const url = `http://api.weatherstack.com/current?access_key=40267945cc78ea08a92346e3dff40e4e&query=${location}&units=${units}`

    request({ url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feelslike: body.current.feelslike,
                precip: body.current.precip
            })
        }
    })
}

module.exports = forecast