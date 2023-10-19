// CREATE SERVER
const express = require("express"); // Require express package
const app = express(); // Store express function/package in app variable
const _PORT = process.env.PORT || 3001; // Set port to 3001 or whatever is in the environment variable PORT
const cors = require('cors'); // Require cors package
const bcrypt = require('bcrypt'); // Require bcrypt package for hashing passwords

// Allow requests from a specific origin (e.g., http://localhost:3000)
const allowedOrigin = 'http://localhost:3000';
const corsOptions = {
  origin: allowedOrigin,
};

app.use(cors(corsOptions)); // Enable CORS with the specified options
app.use(express.json()); // Use express to parse json data

require('dotenv').config(); // Protect database password

// CONNECT TO DB
const   username = process.env.DATABASE_USERNAME,
        password = process.env.DATABASE_PASSWORD,
        database = process.env.DATABASE_NAME;

const mongoose = require("mongoose"); // Require mongoose package
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.7c2kgsd.mongodb.net/${database}?retryWrites=true&w=majority`);

// MODELS

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

// IMPORT ADMIN MODEL
const Admin = require("./models/Admins"); // Require Admin model
app.post ("/register", async function(req, res) {
    const { username, password } = req.body
    const admin = await Admin.findOne({username})
    if (admin) {
        res.json({message: "Username already exists!"})
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            username,
            password: hashedPassword});
        await newAdmin.save();
        return res.json({message: "Admin created successfully!"})
    }
});

app.listen(_PORT, function() { // Listen to server: Listen function takes two parameters, port and callback function
    console.log("Server is running on port " + _PORT + ".");
});