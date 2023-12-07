const mongoose = require("mongoose")
const Service = require("./service_model")
const Project = require("./project_model")

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
    services: [
        {
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
        }
    ]
    
})

module.exports =  mongoose.model("Portfolio", portfolioSchema)