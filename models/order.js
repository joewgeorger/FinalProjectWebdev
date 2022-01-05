//schema for orders

const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    }
    ,
    dough: {
        type: String,
        required: true
    },
    topping: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Order', orderSchema)