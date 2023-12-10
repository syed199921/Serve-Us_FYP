const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema(
    {
        bill:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bill',
            required: true
        },
        amountPaid: {
            type: Number,
            required: true
        },
        paymentMethod: {
            type: String
        },
        paymentDate: {
            type: String
        },
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Paid'],
            default: 'Pending'
        }
        
    }
)

module.exports = mongoose.model("Payment", paymentSchema)