// data base Model (schema)
const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
//create user schema and its attributs
const serviceProviderSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    type: String,
    password: String,
    bio: String,
    image: String,
    posts: []
});
serviceProviderSchema.plugin(uniqueValidator);
//create model name and affect userSchema to it
const user = mongoose.model("serviceProvider", serviceProviderSchema);
//on utilise le PascalCase
module.exports = user;