const express = require('express')
const movieRoute = require('./routes/movieRoutes')
const connection = require('./config/db');
require('dotenv').config()

const port = process.env.PORT;

const server = express()
server.use(express.json())
server.use('/movie',movieRoute)

server.listen(port, async () => {
    try {
        await connection
        console.log('server is working fine and database is connected');
    } catch (error) {
        console.log(`error - ${error}`);
    }
})