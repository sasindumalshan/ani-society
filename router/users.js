const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    const { username, password, name } = req.body;  // Changed from fullname to name

    const newUser = new User({
        username,
        password,
        fullname: name  // Use name as fullname
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
