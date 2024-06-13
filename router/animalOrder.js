
const express = require('express');
const router = express.Router();
const AnimalOrder = require('../models/AnimalOrder');


router.post('/', async (req, res) => {
    const { name, contactNumber, address, pets } = req.body;

    const newAnimalOrder = new AnimalOrder({
        name,
        contactNumber,
        address,
        pets: pets.map(pet => ({
            _id: pet._id,
            id: pet.id,
            name: pet.name,
            available_status: pet.available_status,
            description: pet.description,
            imgsrc: pet.imgsrc,
            catcher_location: pet.catcher_location,
            catcher_date: new Date(pet.catcher_date),
            damage: pet.damage,
            age: pet.age,
            category: pet.category
        }))
    });

    try {
        const savedAnimalOrder = await newAnimalOrder.save();
        res.status(201).json(savedAnimalOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;