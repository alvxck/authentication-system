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

// Attempt Database connection
(async ()=> {
    try {
        await mongoose.connect('mongodb://localhost:27017/login_system')
    } catch (err) {
        console.log('Connection to database failed. Error: ' + err)
    }
})();


// Initialization
app.listen(HTTP_PORT, () => {
    console.log('Server running on port ' + HTTP_PORT)
})

// Register
app.post('/api/register', async (req, res) => {
    try {
        // Hash email and password before saving to DB
        let hashEmail = hash.sha256(req.body.email)
        let hashPassword = hash.sha256(req.body.password)

        await User.create({
            name: req.body.name,
            email: hashEmail,
            password: hashPassword
        })

        res.status(201).json({message: 'account created'})

    } catch (err) {
        res.status(409).json({error: 'account exists already'})
    }
})
 
// Login
app.post('/api/login', async (req, res) => { 
    try{
        // Hash requested email before checking DB
        const user = await User.findOne({
            email: hash.sha256(req.body.email),
        })
    
        // Hash requested password and compare with password in DB
        let isPasswordValid = hash.sha256(req.body.password) == user.password
        
        // Create jwt if requested email and password are valid 
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

            res.status(200).json({message: 'account found', user: token, username: user.name.toLowerCase()})
        } else {
            res.status(400).json({error: 'incorrect password', user: false})
        }
    } catch (err) {
        res.status(404).json({error: 'account does not exist'})
    }

})

// User Token Verification Middleware
function verifyToken(req, res, next) {
    try{
        const authHeader = req.headers['authorization'].split(' ')
        jwt.verify(authHeader[1], process.env.TOKEN_SECRET)

        next();
    } catch (err) {
        res.status(401).json({error: 'unathorized token'})
    }
}

// Home
app.get('/api/:id', verifyToken, async (req, res) => {
    try {
        const authHeader = req.headers['authorization'].split(' ')

        const user = await User.findOne(
            { email: jwt.decode(authHeader[1]).email}
        )

        res.status(200).json({username: user.name})

    } catch (err) {
        res.status(404).json({error: 'user not found'})
    }
})

// Update Name
app.put('/api/:id/update_name', verifyToken, async (req, res) => {
    try {
        const authHeader = req.headers['authorization'].split(' ')

        await User.updateOne(
            { email: jwt.decode(authHeader[1]).email}, 
            { $set: {name: req.body.name}}
        )

        res.status(201).json({status: 'name changed successfully'})

    } catch (err) {
        res.status(500)
    }
})

// Delete User
app.delete('/api/:id/delete_account', verifyToken, async (req, res) =>{
    try {
        const authHeader = req.headers['authorization'].split(' ')

        await User.deleteOne(
            {email: jwt.decode(authHeader[1]).email},
        )

        res.status(200).json({status: 'account deleted successfully'})

    } catch (err) {
        res.status(500)
    }
})
