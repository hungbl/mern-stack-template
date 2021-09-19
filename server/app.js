const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')
const { urlencoded, application } = require('express')

app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(cookieParser())

// simple route
app.use('/api/health-check', require('./routers/health-check'))
app.use('/api/users', require('./routers/users'))
app.use('/api/auth', require('./routers/auth'))
app.use('/api/profile', require('./routers/profile'))
app.use('/api/post', require('./routers/posts'))

module.exports = app
