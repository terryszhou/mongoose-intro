// require/config express app
const express = require('express')
const app = express()


// require/connect to database
const db = require('./models')
db.connect()

// request body middleware
app.use(express.urlencoded({ extended: false }))

// misc. variables
const PORT = 3000
const log = console.log

// test index route / -- return a server message
app.get('/', (req, res) => {
    res.json({ msg: "Hello from the Drinks API."})
})

// POST /drinks -- CREATE one drink & redirect to /drinks
// .THEN FORMAT
app.post('/drinks', (req, res) => {
    db.Drink.create({
        name: req.body.name,
        rating: req.body.rating
    })
    .then(() => {
        res.redirect('/drinks')
    })
    .catch(err => {
        log(err)
    })
})

// ASYNC/AWAIT FORMAT
// app.post('/drinks', async (req, res) => {
//     try {
//         const drinks = await db.Drink.create({
//             name: req.body.name,
//             rating: req.body.rating
//         })
//         res.redirect('/drinks')
//     }
//     catch(err) {
//         log(err)
//     }
// })

// GET /drinks -- READ all drinks from the db
// .THEN FORMAT
app.get('/drinks', (req, res) => {
    db.Drink.find({})
    .then((result) => {
        res.json(result)
    })
    .catch(err => {
        log(err)
    })
})

// ASYNC/AWAIT FORMAT
// app.get('/drinks', async (req, res) => {
//     try {
//         const drinks = await db.Drink.find({})
//         res.json({ drinks })
//     } catch(err) {
//         log(err)
//     }
// })

// PUT /drinks/:id -- UPDATE one drink & redirect to /drinks
// .THEN FORMAT
app.put('/drinks/:id', (req, res) => {
    db.Drink.findById(req.params.id)
    .then(foundDrink => {
        foundDrink.name = req.body.name
        foundDrink.rating = req.body.rating
        foundDrink.save()
        .then(() => {
            res.redirect('/drinks')
        })
    })
    .catch(err => {
        log(err)
    })
})

// app.put('/drinks/:id', async (req, res) => {
//     const foundDrink = await db.Drink.findById(req.params.id)
//     try {

//     } catch (err) {
//         log(er)
//     }
// })

// DELETE /drinks:id -- DESTROY one drink & redirect to /drinks
app.delete('/drinks/:id', (req, res) => {
    db.Drink.findByIdAndDelete(req.params.id)
    .then(deletedItem => {
        log(deletedItem)
        res.redirect('/drinks')
    })
    .catch(err => {
        log(err)
    })
})

// listen to port
app.listen(PORT, () => {
    log(`Welcome to Port ${PORT}`)
})