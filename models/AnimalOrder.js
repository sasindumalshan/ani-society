// models/AnimalOrder.js
const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    available_status: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgsrc: {
        type: String,
        required: true
    },
    catcher_location: {
        type: String,
        required: true
    },
    catcher_date: {
        type: Date,
        required: true
    },
    damage: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const AnimalOrderSchema = new mongoose.Schema({
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    contactNumber: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        lane: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        }
    },
    pets: [PetSchema]
});

module.exports = mongoose.model('AnimalOrder', AnimalOrderSchema, 'animal-order');
