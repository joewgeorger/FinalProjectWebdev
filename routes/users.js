//router for user information on the back end
const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Sess = require('../models/userSession')



// Different routes
//get all users
// router.get('/', async (req, res) => {
//     try {
//         const users = await User.find()
//         res.json(users)
//     } catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })
// Getting user
router.post('/login', (req, res, next) => {
    const getUser = new User({
        user: req.body.user,
        pass: req.body.pass
    })

    if (!getUser.user) {
        return res.send({
            message: 'Error: Username cannot be blank'
        });
    }
    if (!getUser.pass) {
        return res.send({
            message: 'Error: Password cannot be blank'
        })
    }

    User.find({
        user: getUser.user
    }, (err, gu) => {
        if (err) {
            return res.send({ message: 'Error: Server Error 1' })
        }
        if (gu.length != 1) {
            return res.send({ message: 'Error: Invalid' })
        }

        const u = gu[0];
        if (u.pass != getUser.pass) {
            return res.send({ message: 'Error: Password invaild' })
        }
        console.log(u.emp)
        const sess = new Sess();
        sess.user = u.user;
        sess.save((err, doc) => {
            console.log(doc)
            if (err) {
                console.log(err)
                return res.send({ message: 'Error: Server Error' })
            }

            return res.send({
                message: 'Valid signin',
                user: doc.user,
                emp: u.emp,
                success: true
            })
        })


    })


})

//Creating user
router.post('/sign-up', (req, res, next) => {
    const u = new User({
        user: req.body.user,
        pass: req.body.pass,
        emp: req.body.emp
    })

    if (!u.user) {
        return res.send({
            message: 'Error: Username cannot be blank'
        });
    }
    if (!u.pass) {
        return res.send({
            message: 'Error: Password cannot be blank'
        })
    }

    User.find({
        user: u.user
    }, async (err, docs) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server Error'
            })
        } else if (docs.length > 0) {
            return res.send('Error: Account already exsits.')
        }
        try {
            const newUser = await u.save()
            // res.status(201).json(newUser)

            const sess = new Sess();
            sess.user = u.user;
            sess.save((err1, doc) => {
                console.log(doc)
                if (err1) {
                    console.log(err1)
                    return res.send({ message: 'Error: Server Error' })
                }

                return res.send({
                    message: 'Valid signin',
                    user: doc.user,
                    emp: u.emp,
                    success: true
                })
            })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }

    })
})

//getting the session
router.get('/verify', async (req, res) => {
    try {
        const sess = await Sess.find()
        res.json(sess)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//logout
router.get('/logout', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    Sess.findOneAndUpdate({
        user: token,
        isDeleted: false
    }, {
        $set: {
            isDeleted: true
        }
    }, null, (err, session) => {
        if (err) {
            return res.send({ message: 'Error: Server Error' })
        } else {
            return res.send({
                success: true
            })
        }

    })
})

module.exports = router