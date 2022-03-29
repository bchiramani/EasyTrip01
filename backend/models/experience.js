// data base Model (schema)
const mongoose = require('mongoose');
//create user schema and its attributs
const experienceSchema = mongoose.Schema({
    title: String,
    destination: String,
    description: String,
    images: String,
    writer: Object,
    date: Date,
    like: [{ email: String }],
    comment: [{ email: String, content: String }]

});
//create model name and affect userSchema to it
const experience = mongoose.model("experience", experienceSchema);
//on utilise le PascalCase
module.exports = experience;