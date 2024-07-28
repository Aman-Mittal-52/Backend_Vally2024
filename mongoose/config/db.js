const mongoose = require("mongoose");
const dotenv = require('dotenv').config()

const url = process.env.CONNECTION_URL

const connection = mongoose.connect(url)

module.exports =  connection;