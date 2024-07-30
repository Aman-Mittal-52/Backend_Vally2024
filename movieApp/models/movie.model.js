const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title:{required:true, type:String},
    description:{required:true, type:String},
    rating:{required:true, type:Number},
    year:{required:true, type:Number},
})

const MovieModel = mongoose.model('movie',movieSchema)

module.exports = MovieModel;