const {Schema, model} = require("mongoose");

const AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const Admin = model("admins", AdminSchema)

module.exports = Admin;