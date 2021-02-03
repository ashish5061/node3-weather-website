
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { groupCollapsed } = require('console')

const app = express()
const port = process.env.PORT || 3000


//define paths for Express config
const PulicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlers engine and viewa location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use (express.static(PulicDirectoryPath))

app.get('',(req, res) =>{
    res.render('index',{
        title: 'weather app',
        name: 'ashish'


    })
    

})
    app.get('/about',(req, res) =>{
        res.render('about',{
            title: 'About me',
        name: 'ashish'


        })
           
    
    
    })

    app.get('/help',(req, res) =>{
        res.render('help',{
         
            help: 'How can I help you',
            title: 'help',
            name: 'ashish'


        })
           
    
    
    })



app.get('',(req,res) =>{
    res.send('<h1>Weather</h1>')

})



//app.get('/weather',(req,res) =>{
  //  res.send({
  ///      forecast: 'it is snowing',
  ///      location: 'Nepal'
  //  })

//})

app.get('/weather',(req,res) =>{

    if (!req.query.address) {
      return  res.send({
            error: 'you must provide a address term'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if (error) {
            return res.send({error})
        }

        
    forecast(latitude, longitude, (error, forecastData) => {
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

  //  res.send({
  //      forecast: 'it is snowing',
  //      location: 'Nepal',
   //     address: req.query.address
   // })

})

app.get('/products',(req,res) =>{

    if (!req.query.search) {
      return  res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })

})





app.get('/help/*',(req,res) => {



    res.render('404',{
        title: '404',
        name: 'ashish',
        errorMessage: 'help not found'

         
    })
})

app.get('*',(req,res) => {



    res.render('404',{
        title: '404',
        name: 'ashish',
        errorMessage: 'page not found'

         
    })
})





app.listen(port,()=> {
    console.log('server is up on port' + port)

})
