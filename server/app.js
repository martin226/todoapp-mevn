const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
const db = require('./config/keys').MongoURI;
mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Successfully Connected To MongoDB..."))
    .catch(err => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use(cors());

// API route
app.use('/api', require('./controller/api'));

// Use static folder on production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/public'));
    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

app.listen(PORT, console.log(`Server Started On Port ${PORT}!`));