
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

// GET route to retrieve animal orders with pagination
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const animalOrders = await AnimalOrder.find()
            .skip((page - 1) * limit)
            .limit(limit);

        const totalOrders = await AnimalOrder.countDocuments();
        const totalPages = Math.ceil(totalOrders / limit);

        res.json({
            animalOrders,
            totalOrders,
            totalPages,
            currentPage: page,
            perPage: limit
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;