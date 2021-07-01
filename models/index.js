// require mongoose/dotenv packages
const mongoose = require('mongoose')
require('dotenv').config()

const connect = () => {
    // define my atlas URI
    const uri = process.env.ATLAS_URI

    // connect mongoose to atlas
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })

    const db = mongoose.connection

    db.once('open', () => {
        console.log(`MongoDB connected on ${db.host}:${db.port}`)
    })

    db.on('error', err => {
        console.log(`Error\n${err}`)
    })
}

// export a function to connect
module.exports = {
    connect, 
    Drink: mongoose.model('Drink', require('./Drink.js'))
}