"use strict"

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/submit-form', async (req, res) => {
    const formData = req.body;
    console.log("Form Data:", formData);

    try { 
        const response = await axios.post('https://getpantry.cloud/apiv1/pantry/28486b5b-2c1c-4633-9b7d-035657f988cc/basket/coffeerecipesubmissions', formData
        );
        res.status(200).send("Form data saved successfully");
    } catch (error) {
        console.error("Error saving to Pantry".error);
        res.status(500).send("Error saving data");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

