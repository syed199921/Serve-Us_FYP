const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Technician'
    },
    role: {
        type: String,
        enum: ['customer', 'technician'],
        required: true
    },
    contactNumber : {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})