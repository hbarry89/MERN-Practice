const express = require("express"); // Require express package
const app = express(); // Store express function/package in app variable

app.listen(3001, function() { // Listen to server: Listen function takes two parameters, port and callback function
    console.log("Server is running on port 3001");
});

