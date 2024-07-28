const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type:String, required:true},
    email: {type:String, required:true},
    age: Number
},{versionKey:false});

const UserModel = mongoose.model('user', userSchema); 

module.exports = UserModel;
