// data base Model (schema)
const mongoose = require('mongoose');
//create user schema and its attributs
const messageSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    content: String
});
//create model name and affect userSchema to it
const message = mongoose.model("message", messageSchema);
//on utilise le PascalCase
module.exports = message;