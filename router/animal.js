const express = require('express');
const router = express.Router();
const Animal = require('../models/animal');

router.get('/', async (req, res) => {
    try {
        const animals = await Animal.find();
        res.json(animals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const animal = await Animal.findOne({ id: req.params.id });
        if (animal == null) {
            return res.status(404).json({ message: 'Cannot find animal' });
        }
        res.json(animal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', (req, res) => {
    res.send('Create a new animal');
});

router.put('/:id', (req, res) => {
    res.send(`Update animal with ID ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Delete animal with ID ${req.params.id}`);
});

module.exports = router;