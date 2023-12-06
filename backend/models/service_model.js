const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    pricing: {
        type: Number,
        required: true
    }
    
})

module.exports = mongoose.model("Service", serviceSchema)