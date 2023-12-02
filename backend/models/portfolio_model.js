const mongoose = require("mongoose")

const portfolioSchema = new mongoose.Schema({
    professionalSummary: {
        type: String
    },
    services: [{
        serviceDescription:{
            type: String
        },
        pricing:{
         type: Number
        }
}]
    
})

module.exports =  mongoose.model("Portfolio", portfolioSchema)