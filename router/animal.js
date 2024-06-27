const express = require('express');
const router = express.Router();
const Animal = require('../models/animal');

const fs = require('fs');
const path = require('path');


// // GET all animals
// router.get('/', async (req, res) => {
//     try {
//         const animals = await Animal.find();
        
//         // Map through each animal and add base64 encoded image
//         const animalsWithImages = await Promise.all(animals.map(async (animal) => {
//             // Construct the full file path for the image
//             const imagePath = path.join(__dirname, '..', animal.imgsrc);
            
//             // Read the image file
//             const imageData = await fs.promises.readFile(imagePath);
            
//             // Convert image data to base64
//             const base64Image = Buffer.from(imageData).toString('base64');
//             const imageSrc = `data:image/png;base64,${base64Image}`;
            
//             // Return the animal object with base64 encoded image
//             return {
//                 ...animal.toObject(),
//                 imgsrc: imageSrc
//             };
//         }));
        
//         res.json(animalsWithImages);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Failed to fetch animals', error: err.message });
//     }
// });

// GET all animals with pagination
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10
    
    try {
        const count = await Animal.countDocuments();
        const totalPages = Math.ceil(count / limit);
        
        // Ensure page is within valid range
        const offset = (page - 1) * limit;
        
        const animals = await Animal.find()
            .skip(offset)
            .limit(limit)
            .exec();
        
        // Map through each animal and add base64 encoded image
        const animalsWithImages = await Promise.all(animals.map(async (animal) => {
                        // Construct the full file path for the image
                        const imagePath = path.join(__dirname, '..', animal.imgsrc);
                        
                        // Read the image file
                        const imageData = await fs.promises.readFile(imagePath);
                        
                        // Convert image data to base64
                        const base64Image = Buffer.from(imageData).toString('base64');
                        const imageSrc = `data:image/png;base64,${base64Image}`;
                        
                        // Return the animal object with base64 encoded image
                        return {
                            ...animal.toObject(),
                            imgsrc: imageSrc
                        };
                    }));
        
        res.json({
            animals: animalsWithImages,
            totalPages: totalPages
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch animals', error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const animal = await Animal.findOne({ id: req.params.id });
        if (animal == null) {
            return res.status(404).json({ message: 'Cannot find animal' });
        }
        // Construct the full URL for the image
        const imagePath = path.join(__dirname, '..', animal.imgsrc);
        
        // Read the image file
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Failed to read image file' });
            }
            // Convert image data to base64
            const base64Image = Buffer.from(data).toString('base64');
            const imageSrc = `data:image/png;base64,${base64Image}`;
            
            // Add imageSrc to the animal object
            const animalWithImage = {
                ...animal.toObject(),
                imgsrc: imageSrc  // Replace the imgsrc with base64 encoded image
            };

            // Return the modified animal object with base64 encoded image
            res.json(animalWithImage);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create a new animal
router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        // Decode base64 file data
        const base64Data = req.body.file.replace(/^data:image\/png;base64,/, "");
        const filePath = `uploads/animals/${Date.now()}.png`;
        
        // Save the file to the server
        fs.writeFileSync(filePath, base64Data, 'base64', (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Failed to save file' });
            }
        });
        // Create a new complaint
        const newAnimal = new Animal({
            id:req.body.id,
            name:req.body.name,
            available_status:req.body.available_status,
            description:req.body.description,
            imgsrc:filePath,
            catcher_location:req.body.catcher_location,
            catcher_date: req.body.catcher_date,
            damage:req.body.damage,
            age:req.body.age,
            category:req.body.category
        });

        // Save the complaint to MongoDB
        await newAnimal.save();
        res.status(200).json({ message: 'Complaint submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to submit complaint' });
    }
});

router.put('/:id', (req, res) => {
    res.send(`Update animal with ID ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
    res.send(`Delete animal with ID ${req.params.id}`);
});

module.exports = router;