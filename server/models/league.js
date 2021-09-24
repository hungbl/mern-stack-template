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
    },
    joins: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        score: Number,
        position: Number
    }],
})

module.exports = mongoose.model('league', leagueSchema)