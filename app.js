const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '1000mb' }));
app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ani-society', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// User model
const User = require('./models/User');

// Register route for creating new users
app.post('/register', async (req, res) => {
    const { username, password, fullname } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            fullname
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log(password)

    try {
        const user = await User.findOne({ username });
        console.log(user)
        if (!user) {
            console.log("user 1")
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("user 2")
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Register route for creating new users
app.post('/register', async (req, res) => {
    const { username, password, fullname } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            password: hashedPassword,
            fullname
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Routes
const animalRoutes = require('./router/animal');
app.use('/animals', animalRoutes);

const animalOrderRoutes = require('./router/animalOrder');
app.use('/animal-orders', animalOrderRoutes);

const complaintRouter = require('./router/complain');
app.use('/complaint', complaintRouter);

const userRoutes = require('./router/users');
app.use('/users', userRoutes);

const paymentRoutes = require('./router/payment');
app.use('/payment', paymentRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
