// const mongoose = require("mongoose"); // Require mongoose package and store it in a variable

// const UserSchema = new mongoose.Schema({ // Create a schema: Schema function which is from mongoose takes one parameter, an object
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     },
//     email: {
//         type: String
//     }
// });

// const User = mongoose.model("users", UserSchema) // Create a model: model function takes two paramaters what and how

// module.exports = User; // Export model

const {Schema, model} = require("mongoose"); // Require mongoose package and store it in a variable

const UserSchema = new Schema({ // Create a schema: Schema function which is from mongoose takes one parameter, an object
    name: {
        type: String
    },
    age: {
        type: Number
    },
    email: {
        type: String
    }
});

const User = model("users", UserSchema) // Create a model: model function takes two paramaters what and how

module.exports = User; // Export model