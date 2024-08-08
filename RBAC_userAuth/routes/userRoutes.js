const express = require('express')
const jwt = require('jsonwebtoken')
const bycrypt = require('bcrypt')
require('dotenv').config()

const UserModel = require('../models/user.model')
const authenticate = require('../middlewares/authenticate.middleware')
const authorize = require('../middlewares/authorize.middleware')

const userRoute = express.Router()

userRoute.post('/register', async (req, res) => {
    try {
        const { username, email, password, phone, role } = req.body;

        const user = await UserModel.findOne({ email })

        if (user) {
            return res.status(400).send('user already registered')
        } else {
            bycrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    return res.status(400).send('password could not hash')
                }
                if (hash) {
                    const newUser = new UserModel({
                        username,
                        email,
                        password: hash,
                        phone,
                        role
                    })
                    await newUser.save()
                    return res.status(201).send('user registered')
                }
            })
        }
    } catch (error) {
        res.status(400).send(`error - ${error}`)
    }
})

userRoute.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(404).send('user not found please register')
        }

        bycrypt.compare(password, user.password, async(err, result) => {
            try {
                
                if (result) {
                    jwt.sign({ username: user.username, email :user.email, role :user.role}, process.env.SECRET_KEY, (err, token) => {
                        if (err) {
                            return res.status(400).send(`error creating token while login - ${err}`)
                        }
                        if (token) {
                            res.set('authorization', `Bearer ${token}`)
                            res.send("login succefullly")
                        }
                    })
                }
                else {
                    return res.status(400).send(`error occour - ${err}`)
                }
            } catch (error) {
                
            }
        })

    } catch (error) {
        res.status(400).send('errror occor while login')
    }
})

userRoute.post('/admin', authenticate,authorize, async (req, res) => {
    try {
        res.json({ msg: 'Admin Route', user: req.user })
    } catch (error) {
        res.status(400).send(`private route error - ${error}`)
    }
})

userRoute.get('/users', async (req, res) => {
    try {
        res.send('users....')
    } catch (error) {
        res.status(400).send(`error occour - ${error}`)
    }
})

userRoute.patch('/updateOneField',authenticate,async(req, res)=>{
    try {
        const userEmail = req.user.email;
        if (req.body.email) {
            return res.status(400).send(`you can't update email`)
        }
        if (req.body.password) {
            bycrypt.hash(req.body.password,5,async (err,hash)=>{
                if(err){
                    return res.status(400).send(`couldn't update the password - ${err}`)
                }else{
                    await UserModel.updateOne({email:userEmail},{password:hash})
                    res.send('password updated please log out and login again')
                }
            })
        }
        if (req.body.username) {
            await UserModel.updateOne({email:userEmail},{username:req.body.username})
            res.send('username updated please log out and login again')
        }
    } catch (error) {
        res.status(400).send(`error - ${error}`)
    }
})


userRoute.delete('/delete',authenticate,authorize,async (req,res)=>{
    try {
        const userEmail = req.user.email;
        await UserModel.deleteOne({email:userEmail})
        return res.send('user deleted')
    } catch (error) {
        res.status(400).send(`error while deleting - ${error}`)
    }
})
module.exports = userRoute;