const express = require('express');
const { connection } = require('./config/db');
const UserModel  = require('./model/user.model');
const ProductModel  = require('./model/product.model');
const productModel = require('./model/product.model');

const port = 3000;
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    try {
        res.json('Home');
    } catch (error) {
        res.send(error);
        console.log(`the error - ${error}`);
    }
});

server.get('/get-user', async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).send(user);
    } catch (error) {
        res.send(error);
    }
});


server.get('/findOne-user/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const user = await UserModel.find({_id:id})
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

server.post('/create-user', async (req, res) => {
    try {
        const { username, email, age } = req.body;
        const user = new UserModel({
            username,
            email,
            age
        });
        await user.save();
        res.json('created the user');
    } catch (error) {
        res.send("oh no error!!");
        console.log(`the error - ${error}`);
    }
});

server.patch('/update-user/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const updatedOne = await UserModel.findByIdAndUpdate({_id:id},req.body)
        res.send(`update the doc,${id},${updatedOne}`)
    } catch (error) {
        res.send(error)
    }
})

server.delete('/delete-user/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const deleted = await UserModel.findByIdAndDelete({_id:id})
        res.send(`delete the doc,${id},${deleted}`)
    } catch (error) {
        res.send(error)
    }
})

server.get('/get-products', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).send(products);
    } catch (error) {
        res.send(error);
    }
});


server.get('/findOne-product/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const product = await productModel.find({_id:id})
        res.send(product)
    } catch (error) {
        res.send(error)
    }
})

server.post('/create-product', async (req, res) => {
    try {
        const { product_id, product, quantity } = req.body;
        const user = new ProductModel({
            product_id,
            product,
            quantity
        });
        await user.save();
        res.json('created the product');
    } catch (error) {
        res.send("oh no error!!");
        console.log(`the error - ${error}`);
    }
});

server.patch('/update-product/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        const updatedOne = await ProductModel.findByIdAndUpdate({_id:id},req.body)
        res.send(`update the doc,${id}`)
    } catch (error) {
        res.send(error)
    }
})

server.delete('/delete-product/:id',async (req,res)=>{
    try {
        const {id} = req.params;
        await ProductModel.findByIdAndDelete({_id:id})
        res.send(`delete the doc,${id}`)
    } catch (error) {
        res.send(error)
    }
})

server.listen(port, async () => {
    try {
        await connection;
        console.log(`listening on ${port} and connection was established`);
    } catch (error) {
        console.log(`Failed to connect to the database: ${error}`);
    }
});
