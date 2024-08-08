const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    phone: Number
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel;