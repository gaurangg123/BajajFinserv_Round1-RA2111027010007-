const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const path = require('path')


app.use(express.static(path.join(__dirname, 'build')))
app.get('/api', (req, res) => [
  res.json([
    message: 'This is the api endpoint'
  ])
)] 
