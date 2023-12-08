const mongoose = require("mongoose")

const technicianSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    technicianType: {
        type: String,
        enum: ['Plumber', 'Electrician'],
        required: true,
        
    },
    dateOfBirth: {
        type: String
    },
    contactNumber: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    portfolio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio'
    }
    
})

module.exports = mongoose.model("Technician", technicianSchema)