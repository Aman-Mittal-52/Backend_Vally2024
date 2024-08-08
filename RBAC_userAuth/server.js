const express = require('express')
require('dotenv').config()

// Components
const connection = require('./config/db');
const userRoute = require('./routes/userRoutes')

// Server
const server = express()

//Middlewares
server.use(express.json())
server.use('/user', userRoute)

// Routes
// /register takes body { username, email, password, phone, role }
// /login takes body { email, password } gives a Bearer token in headers
// /users route is a simple route everyone can acess it
// /admin route is a special route needs to be role `admin`

server.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log(`server is running on Port:- ${process.env.PORT} and MongoDB is connected`);
    } catch (error) {
        console.log(`error - ${error}`);
    }
})