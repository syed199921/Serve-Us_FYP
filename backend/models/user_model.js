const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    technician_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Technician'
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