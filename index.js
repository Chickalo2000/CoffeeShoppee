const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

  const coffeeFunFactSchema = new mongoose.Schema({
    fact: String,
    author: String,
  });
  
  const CoffeeFunFact = mongoose.model("coffeefunfacts", coffeeFunFactSchema);
  
  app.get('/funfact', async (req, res) => {
    try {
      const facts = await CoffeeFunFact.find();
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      res.json(randomFact);
    } catch (error) {
      res.status(500).send("Error fetching fun facts");
    }
  });