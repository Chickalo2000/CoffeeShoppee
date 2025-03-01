const mongoose = require('mongoose');

const coffeeRecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      },
    
    // name: String,
    // latitude: Number,
    // longitude: Number,
})

const CoffeeRecipe = mongoose.model('CoffeeRecipe', coffeeRecipeSchema);

module.exports = CoffeeRecipe;