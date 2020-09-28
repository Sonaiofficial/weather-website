/*
const path = require('path')
const express = require('express')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))   
const app = express()

const publicDirectoryPath = path.join(__dirname,  '../public')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath)) 

app.get('', (req, res) => {
    res.render('index', {
        title:'Web App'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText='Infromation'
    })
})


 app.get('/weather' , (req , res) => {
     res.send([{
         forecast : 'Clean Sky',
     },
     {
         location : 'Maheshtala, Kolkata'
     }
    ])
 })


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
*/




const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath= path.join(__dirname,'../templates/views')
const partialPath= path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sonai Barua'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'sonai barua'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must enter an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude,location} = {}) => {
        if (error){
            return res.send({error}) 

          }
          console.log(latitude,longitude)
          forecast(latitude,longitude, (error,forecastData) => {
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




   /* res.send({
        
            forecast: 'sky is blue',
            location:'kolkata',
            address: req.query.address

    })*/
})


app.get('/products', (req, res) => {
    if(!req.query.search)
    {
        return res.send({
            error:'you must provide a search'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        helpText: '404',
        title: 'Sonai Barua',
        errorMessage: 'page not found'
    })
})


app.get('*', (req,res) => {
    res.render('404', {
        title:'404',
        name:'Sonai Barua',
        errorMessage:'Page not Found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})