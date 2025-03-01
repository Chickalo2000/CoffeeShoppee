const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const CoffeeRecipe = require('./models/CoffeeRecipe');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // makes it understand json

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });


app.get('/api/coffee-recipes', async (req, res) => {
    const coffeeRecipes = await CoffeeRecipe.find();
    res.send(coffeeRecipes);
});

app.post('/api/coffee-recipes', async (req, res) => {
    const coffeeRecipe = new CoffeeRecipe({
        name: req.body.name,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    });
    await coffeeRecipe.save();
    res.send(coffeeRecipe);
});

app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

