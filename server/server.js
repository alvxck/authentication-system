const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const hash = require('js-sha256')
require('dotenv').config()
const HTTP_PORT = process.env.PORT || 1337

//------------------------------------------------------


// Config
app.use(cors());
app.use(express.json());

// Database connection
(async ()=> {
    try {
        await mongoose.connect('mongodb://localhost:27017/login_system')
    } catch (error) {
        console.log('Connection to database failed. Error: ' + error)
    }
})()


// Initialization
app.listen(HTTP_PORT, () => {
    console.log('Server running on port ' + HTTP_PORT)
})

// Register
app.post('/api/register', async (req, res) => {
    try {
        let hashEmail = hash.sha256(req.body.email)
        let hashPassword = hash.sha256(req.body.password)

        await User.create({
            name: req.body.name,
            email: hashEmail,
            password: hashPassword
        })

        res.json({status: 'ok'}) 

    } catch (error) {
        res.json({status: 'error', error: 'An account with this email exists already. Please try logging in instead.'})
    }
})

// Login
app.post('/api/login', async (req, res) => { 
    try{
        let user = await User.findOne({
            email: hash.sha256(req.body.email),
        })
    
        let isPasswordValid = hash.sha256(req.body.password) == user.password
        
        if (isPasswordValid) {
            const token = jwt.sign(
                {
                name: user.name,
                email: user.email
                }, 
                process.env.TOKEN_SECRET,
                {
                    expiresIn: '24h'
                }
            )
            res.json({status: 'ok', user: token})
        } else {
            res.json({status: 'error', error: 'Incorrect password. Please try again.', user: false})
        }
    } catch (error) {
        res.json({status: 'error', error: 'This account does not exist. Please try again or create a new account.'})
    }

})

// Home
app.get('/api/home', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decode = jwt.verify(token, process.env.TOKEN_SECRET)
        const email = decode.email
        const user = await User.findOne({ email: email})

        return res.json({status: 'ok', name: user.name})

    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})

// Change Name
app.post('/home/update_name', async (req, res) => {
    const token = req.headers['x-access-token']

    try {
        const decode = jwt.verify(token, process.env.TOKEN_SECRET)
        const email = decode.email
        await User.updateOne(
            { email: email}, 
            { $set: {name: req.body.name}}
        )

        return res.json({status: 'ok'})

    } catch (error) {
        console.log(error)
        res.json({ status: 'error', error: 'invalid token' })
    }
})


// Verify User Token
function verifyToken(req, res, next) {
    try{
        const authHeader = req.headers['authorization']

        jwt.verify(authHeader, process.env.TOKEN_SECRET)
        res.json({status: 'ok'})

        next();
    } catch (err) {
        res.json({status: 'error', error: 'invalid token'})

        next();
    }
}
