// Step 1: Import my packages
const express = require('express')
const cors = require('cors')

// Step 2: Setup an instance of Express application
const app = express()


// Step 3: Setup middleware (helps with communication between front and backend)
app.use(express.json())
app.use(cors())

// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'eb802fbe3dbe4e80b2965e8f2bc09a2e',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

// Step 4: Setup a place for our endpoints
const {getAllMovies, deleteMovie, createMovie, updateMovie} = require('./controller')

app.get('/api/movies', getAllMovies)
app.delete('/api/movies/:id', deleteMovie) // id will be the property name assigned in the object
app.post('/api/movies', createMovie)
app.put('/api/movies/:id', updateMovie)

//Step 5: Open Server Port to allow data transfers 
app.listen(4004, () => console.log('Running on port 4004'))

