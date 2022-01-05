//backend router for order data
const express = require('express')
const router = express.Router()
const Order = require('../models/order')

//set up routes
//get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find()
        res.json(orders)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Get orders from one user
router.get('/uOrders', async (req, res) => {
    const { query } = req;
    const { u } = query;
    try {
        const os = await Order.find({user: u})
        res.json(os)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//add order
router.post('/add', async (req, res) => {
    const o = new Order({
        user: req.body.user,
        dough: req.body.dough,
        topping: req.body.topping
    })
    try {
        const newOrder = await o.save()
        res.status(201).json(newOrder)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//function for getting specific order
async function getOrder(req, res, next) {
    let ors
    try {
        ors = await Order.find({ user: req.params })
        if (ors == null) {
            return res.status(404).json({ message: "User has no previous orders." })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })

    }

    res.ors = ors;
    next()
}
module.exports = router