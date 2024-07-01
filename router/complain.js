

const express = require('express');
const router = express.Router();
const Complaint = require('../models/complaint');
const fs = require('fs');
const path = require('path');

// Route to handle complaint submission
router.post('/submit', async (req, res) => {

    console.log(req.body)
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
            file: filePath,
            user:req.body.user
        });

        // Save the complaint to MongoDB
        await newComplaint.save();
        res.status(200).json({ message: 'Complaint submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to submit complaint' });
    }
});

// Endpoint to get complaints by user
router.get('/complaints', async (req, res) => {
    const user = req.query.user;
    if (!user) {
      return res.status(400).send('User query parameter is required');
    }
    
    try {
      const complaints = await Complaint.find({ user });
      
      const complaintsWithBase64 = await Promise.all(complaints.map(async (complaint) => {
        const filePath = path.join(__dirname, '..', 'uploads', path.basename(complaint.file));
        try {
          const fileData = fs.readFileSync(filePath);
          const base64Image = fileData.toString('base64');
          return {
            ...complaint._doc,
            base64Image: `data:image/png;base64,${base64Image}` // Adjust MIME type as needed
          };
        } catch (err) {
          console.error(`Error reading file: ${filePath}`, err);
          return {
            ...complaint._doc,
            base64Image: null
          };
        }
      }));
      
      res.json(complaintsWithBase64);
    } catch (err) {
      res.status(500).send('Server error');
    }
  });

  // Endpoint to get complaints by user with pagination
router.get('/comp', async (req, res) => {
  
    const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10;  // Default to 10 items per page if not provided


    try {
        const skip = (page - 1) * limit;

        const complaints = await Complaint.find()
            .sort({ _id: -1 })  // Sort by ID in descending order
            .skip(skip)
            .limit(limit);

        const complaintsWithBase64 = await Promise.all(complaints.map(async (complaint) => {
            const filePath = path.join(__dirname, '..', 'uploads', path.basename(complaint.file));
            try {
                const fileData = fs.readFileSync(filePath);
                const base64Image = fileData.toString('base64');
                return {
                    ...complaint._doc,
                    base64Image: `data:image/png;base64,${base64Image}` // Adjust MIME type as needed
                };
            } catch (err) {
                console.error(`Error reading file: ${filePath}`, err);
                return {
                    ...complaint._doc,
                    base64Image: null
                };
            }
        }));

        res.json({
            complaints: complaintsWithBase64,
            page,
            limit,
            total: await Complaint.countDocuments()
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Endpoint to find a complaint by ID
router.get('/complaint-details/:id', async (req, res) => {
  const complaintId = req.params.id;

  try {
      const complaint = await Complaint.findById(complaintId);

      if (!complaint) {
          return res.status(404).json({ message: 'Complaint not found' });
      }

      const filePath = path.join(__dirname, '..', 'uploads', path.basename(complaint.file));
      try {
          const fileData = fs.readFileSync(filePath);
          const base64Image = fileData.toString('base64');

          res.json({
              ...complaint._doc,
              base64Image: `data:image/png;base64,${base64Image}` // Adjust MIME type as needed
          });
      } catch (err) {
          console.error(`Error reading file: ${filePath}`, err);

          res.json({
              ...complaint._doc,
              base64Image: null
          });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


