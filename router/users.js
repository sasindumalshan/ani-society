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


// GET route to retrieve users with pagination
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const users = await User.find()
            .skip((page - 1) * limit)
            .limit(limit);
        
        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        res.json({
            users,
            totalUsers,
            totalPages,
            currentPage: page,
            perPage: limit
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET route to retrieve total user count
router.get('/count', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.json({ totalUsers });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

module.exports = router;
