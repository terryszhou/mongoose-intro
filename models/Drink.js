// require the mongoose package
const mongoose = require('mongoose')

// define a mongoose schema
const DrinkSchema = new mongoose.Schema({
    name: {
        type: String
    },
    rating: {
        type: Number
    }
}, {
    timestamps: true
})

// build a model from the schema OR export schema and build model in index.js

module.exports = DrinkSchema