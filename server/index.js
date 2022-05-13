const express = require('express')
const app = express()
const HTTP_PORT = process.env.PORT || 1337;
const cors = require('cors')

//------------------------------------------------------

app.use(cors())
app.use(express.json())

app.listen(HTTP_PORT, () => {
    console.log('Server running on port ' + HTTP_PORT)
})

// add encryption
app.post('/register', (req, res) => {
    console.log(req.body)
    res.json({status: 'ok'})
})

