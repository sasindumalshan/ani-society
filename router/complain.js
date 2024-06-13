// const express = require('express');
// const router = express.Router();
// const Complaint = require('../models/complaints');

// router.post('/submit', async (req, res) => {
//     try {
//         const newComplaint = new Complaint({
//             contact: req.body.contact,
//             street: req.body.street,
//             lane: req.body.lane,
//             city: req.body.city,
//             description: req.body.description,
//             file: req.body.file 
//         });

//         await newComplaint.save();
//         res.status(200).json({ message: 'Complaint submitted successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Failed to submit complaint' });
//     }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Complaint = require('../models/complaint');
const fs = require('fs');

// Route to handle complaint submission
router.post('/submit', async (req, res) => {
    try {
        // Decode base64 file data
        const base64Data = req.body.file.replace(/^data:image\/png;base64,/, "");
        const filePath = `uploads/${Date.now()}.png`;
        
        // Save the file to the server
        fs.writeFileSync(filePath, base64Data, 'base64', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Failed to save file' });
            }
        });

        // Create a new complaint
        const newComplaint = new Complaint({
            contact: req.body.contact,
            street: req.body.street,
            lane: req.body.lane,
            city: req.body.city,
            description: req.body.description,
            file: filePath
        });

        // Save the complaint to MongoDB
        await newComplaint.save();
        res.status(200).json({ message: 'Complaint submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to submit complaint' });
    }
});

module.exports = router;


