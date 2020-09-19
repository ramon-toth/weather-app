const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()


// Define paths for express config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// set up handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Set up static handler
app.use(express.static(publicDir))


// set up routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ramon',
    
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ramon'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Ramon'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided!'
        })

    }

    geocode (req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({error})
        }
        forecast(latitude, longitude, 'm', (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    console.log(req.query)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        error: 404,
        message: 'Help article not found.',
        title: 'Error',
        name: 'Ramon'
    })
})

// Error handler

app.get('*', (req,res)=> {
    res.render('error', {
        error: 404,
        message: 'Page not found.',
        title: '404',
        name: 'Ramon'

    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})