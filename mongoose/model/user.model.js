const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number
},{versionKey:false});

const UserModel = mongoose.model('user', userSchema); 

module.exports = UserModel;
