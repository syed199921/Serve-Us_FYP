const mongoose = require("mongoose")
const Service = require("./service_model")
const Project = require("./project_model")

const portfolioSchema = new mongoose.Schema({
    professionalSummary: {
        type: String
    },
    projects: [Project.Schema],
    services: [Service.Schema]
    
})

module.exports =  mongoose.model("Portfolio", portfolioSchema)