// data base Model (schema)
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
//create user schema and its attributs
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    image: String,
    email: { type: String, unique: true },
    age: Number,
    password: String,
    bio: String,
    posts: []
});
userSchema.plugin(uniqueValidator);
//create model name and affect userSchema to it
const user = mongoose.model("user", userSchema);
//on utilise le PascalCase
module.exports = user;