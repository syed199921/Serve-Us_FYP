const mongoose = require("mongoose")
const Service = require("./service_model")

const portfolioSchema = new mongoose.Schema({
    professionalSummary: {
        type: String
    },
    projects: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String
            },
            images: {
                type: [String]
            },
            testimonials: {
                type: [String]
            }
        }
    ],
    services: [Service.Schema]
    
})

module.exports =  mongoose.model("Portfolio", portfolioSchema)