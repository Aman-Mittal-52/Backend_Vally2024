const express = require('express')
const MovieModel = require('../models/movie.model');



const movieRoute = express.Router();

movieRoute.get('/get-movies', async (req, res) => {
    
    const { q, rating, sortBy, page, limit  } = req.query;
    try {
        let filter = {};
        if (q) {
            filter.title = new RegExp(q, 'i');
        }
        if (rating) {
            filter.rating = rating;
        }

        const movies = await MovieModel.find(filter)
            .sort(sortBy ? { [sortBy]: 1 } : {})
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.send(movies);
    } catch (error) {
        res.status(400).send('error while getting movies', error)
    }
})


movieRoute.post('/add-movie', async (req, res) => {
    try {
        const receive = await MovieModel.findOne({ title: req.body.title })
        if (receive && Object.keys(receive).length !== 0) {
            return res.status(400).send("movie is already exists")
        } else {
            const movie = new MovieModel(req.body)
            await movie.save()
            res.send("movie added")
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: 'error while creating movies', "error": error.message })
    }
})


movieRoute.patch('/update-movie/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        await MovieModel.findByIdAndUpdate({ _id }, req.body)
        res.send("movie updated")
    } catch (error) {
        res.status(400).send({ message: 'error while updating movies', "error": error.message })
    }
})

movieRoute.delete('/delete-movie/:_id', async (req, res) => {
    try {
        const { _id } = req.params;
        await MovieModel.findByIdAndDelete({ _id })
        res.send("movie deleted")
    } catch (error) {
        res.status(400).send({ message: 'error while updating movies', "error": error.message })
    }
})

module.exports = movieRoute