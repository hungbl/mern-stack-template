const mongoose = require('mongoose')

const leagueSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    code: {
        type: String
    },
    description: {
        type: String
    },
    thumbnail: {
        type: String
    },
    type: {
        code: {
            type: String
        },
        name: {
            type: String,
            require: true
        }
    }
})

module.exports = mongoose.model('league', leagueSchema)