// require mongoose package
const mongoose = require('mongoose')

// define my atlas URI
require('dotenv').config()
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

// export a function to connect
