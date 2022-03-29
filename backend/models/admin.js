// data base Model (schema)
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
//create user schema and its attributs
const adminSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    function: String,
    email: { type: String, unique: true },
    password: String
});
adminSchema.plugin(uniqueValidator);
//create model name and affect userSchema to it
const admin = mongoose.model("admin", adminSchema);
//on utilise le PascalCase
module.exports = admin;