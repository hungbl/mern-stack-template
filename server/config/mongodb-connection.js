const mongoose = require('mongoose')

const initialConnection = () => {
    mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(con => {
                console.log(`MongoDB connected with host: ${con.connection.host}`)
            })
}

module.exports = initialConnection