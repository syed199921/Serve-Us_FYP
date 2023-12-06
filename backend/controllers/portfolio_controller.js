const Portfolio = require("../models/portfolio_model")
const Technician = require("../models/technician_model")

let createPortfolio = async (req, res) => {
    let {technician_id} = req.body
    let technician = await Technician.findById(technician_id)
    let portfolio = new Portfolio(
        {
            professionalSummary: "",
            services: []
        }
    ) 
    portfolio.save()
}