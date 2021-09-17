const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
const { urlencoded, application } = require('express')

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cookieParser())

// simple route
app.use('/api/health-check', require('./routers/health-check'))

module.exports = app
