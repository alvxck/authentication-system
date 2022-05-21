const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    },
    {collection: 'user_data'}
)

const model = mongoose.model('UserData', User)

module.exports = model
