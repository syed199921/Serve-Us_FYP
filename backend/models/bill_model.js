const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
    },
    dateAndTime: {
        type: String
    },
    bankDetails:
    [
        {
            bankName: {
                type: String,
                required: true
            },
            accountNumber: {
                type: String,
                required: true
            }
        }     
    ], 
    status: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending'
    }
})

module.exports = mongoose.model("Bill", billSchema)
