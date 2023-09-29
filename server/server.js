// PROTECT DB PASSWORD
require('dotenv').config();
const password = process.env.DATABASE_PASSWORD;

// CREATE SERVER
const express = require("express"); // Require express package
const cors = require('cors'); // Require cors package
const app = express(); // Store express function/package in app variable

app.use(express.json()); // Use express to parse json data

// CONNECT TO DB
const mongoose = require("mongoose"); // Require mongoose package
mongoose.connect(`mongodb+srv://hbarry:${password}@cluster0.7c2kgsd.mongodb.net/mernDB?retryWrites=true&w=majority`);
// mongoose.connect("mongodb+srv://hbarry:<password>@cluster0.7c2kgsd.mongodb.net/mernDB?retryWrites=true&w=majority");

// Allow requests from a specific origin (e.g., http://localhost:3000)
const allowedOrigin = 'http://localhost:3000';
const corsOptions = {
  origin: allowedOrigin,
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

// IMPORT USER MODEL
const User = require("./models/Users"); // Require User model

app.get ("/", function(req, res) { // Get function takes two parameters, route and callback function with request and response parameters
    res.send("Hello World") // Response: send message: Hello World  to client
});

// GET USERES
// To avoid delay between server and client (finding and getting the info/response), we use async and await, otherwise you will get error message: TypeError: Converting circular structure to JSON
app.get ("/users", async function(req, res) {
    const users = await User.find();
    res.json(users) // Response: as a json object
});

// CREATE USER
app.post ("/createUser", async function(req, res) {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(req.body);
});

app.listen(3001, function() { // Listen to server: Listen function takes two parameters, port and callback function
    console.log("Server is running on port 3001");
});