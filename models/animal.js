// models/animal.js
const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    id: String,
    name: String,
    available_status: String,
    description: String,
    imgsrc: String,
    catcher_location: String,
    catcher_date: Date,
    damage: String,
    age: String,
    category: String
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
