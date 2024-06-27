const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    available_status: { type: String, required: true },
    description: { type: String, required: true },
    imgsrc: { type: String, required: true },
    catcher_location: { type: String, required: true },
    catcher_date: { type: String, required: true },
    damage: { type: String, required: true },
    age: { type: String, required: true },
    category: { type: String, required: true }
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;

