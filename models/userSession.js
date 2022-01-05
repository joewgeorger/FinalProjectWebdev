//schema for user sessions

const mongoose = require('mongoose')

const userSessionSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    emp: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('session', userSessionSchema)