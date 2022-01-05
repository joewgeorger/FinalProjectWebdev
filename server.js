//server page
require('dotenv').config()

//uses react, cors, and mongoose to run the back end
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());

//connects to database
mongoose.connect( process.env.DB_URL ,  {useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

//routes for the different api's I wan to use
const userRouter = require('./routes/users')
app.use('/user', userRouter)

// const userSession = require('./routes/userSession')
// app.use('/session', userRouter)

const ordersRoute = require('./routes/orders')
app.use('/orders', ordersRoute)

//api's for the data not in the db
app.get('/api/doughs', (req, res) =>{ 
    const doughs = [
        {id: 1, dough: "classic"},
        {id: 2, dough: "chocolate"},
        {id: 3, dough: "red velvet"}
    ];

    res.json(doughs);
});

app.get('/api/toppings', (req, res) =>{
    const toppings = [
        {id: 1, topping: "chocolate chip"},
        {id: 2, topping: "M&M"},
        {id: 3, topping: "sprinkles"}
    ];

    res.json(toppings);
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));