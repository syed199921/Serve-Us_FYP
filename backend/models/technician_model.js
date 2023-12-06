const mongoose = require("mongoose")

const technicianSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String
    },
    contactNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String
    }
    
})