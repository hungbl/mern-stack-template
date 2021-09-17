const app = require('./app')
const initialConnection  = require('./config/mongodb-connection')

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// initialMongoDBConnection()
initialConnection()

const server = app.listen(process.env.PORT || 8081, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})