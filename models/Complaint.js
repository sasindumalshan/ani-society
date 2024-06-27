const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    contact: { type: String, required: true },
    street: { type: String, required: true },
    lane: { type: String, required: true },
    city: { type: String, required: true },
    user: { type: String, required: true },
    description: { type: String, required: true },
    file: { type: String, required: true }
});

const Complaint = mongoose.model('Complaint', complaintSchema);

module.exports = Complaint;
