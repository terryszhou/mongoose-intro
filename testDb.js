const db = require('./models')
db.connect()

const drinkCRUD = async () => {
    try {
        // CREATE
        const newDrink = await new db.Drink({
            name: "Chocolate Milk",
            rating: 9
        })

        await newDrink.save()

        console.log(`new drink: ${newDrink}`)
        // READ

        // UPDATE

        // DESTROY
    } catch (err) {
        console.log(err)
    }
}

drinkCRUD()