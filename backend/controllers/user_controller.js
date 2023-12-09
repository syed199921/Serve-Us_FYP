const User = require('../models/user_model')
const Portfolio = require('../models/portfolio_model')
const Technician = require('../models/technician_model')
const Customer = require('../models/customer_model')
const axios = require('axios')

let signUp = async (req, res) => {
    let {fullName, dateOfBirth, address, role, technicianType, contactNumber, password} = req.body
    
    
    if(role === "Technician"){
        let portfolio = new Portfolio(
            {
                professionalSummary: "hello",
                projects: [],
                services: []
            }
        )
        try {
             await portfolio.save()
        }catch(err){
            return res.json({err: err.toString()})
        }
    
       
        let technician = new Technician(
            {
                fullName: fullName,
                technicianType: technicianType,
                dateOfBirth: dateOfBirth,
                contactNumber: contactNumber,
                address: address,
                portfolio: portfolio._id
            }
        )
        try {
             await technician.save()
        }catch(err){
            return res.json({err: err.toString()})
        }
     let user = new User({
        userId: technician._id,
        role: role,
        contactNumber: contactNumber,
        password: password
    })
    try {
        let savedUser = await user.save()
        return res.json({user: savedUser})
    }catch(err){
        return res.json({err: err.toString()})
    }
     
    }
    else if( role === "Customer"){
        let customer = new Customer({
            fullName: fullName,
            dateOfBirth: dateOfBirth,
            contactNumber: contactNumber,
            address: address
        })
        try {
             await customer.save()
            
        }catch(err){
            return res.json({err: err.toString()}) 
        }

        let user = new User({
            userId: customer._id,
            role: role,
            contactNumber: contactNumber,
            password: password
        })
        try {
            let savedUser = await user.save()
            return res.json({user: savedUser})
        }catch(err){
            return res.json({err: err.toString()})
        }
    }

    
}

let getGeolocation = async () =>{
    let ip = null
    try{
         await axios.get('http://ip-api.com/json').then(response => {
            ip = response.data.query
         })

    

    }catch(err){
        return null
    }
    let location = null
    try{
     location = await axios.get(`http://ip-api.com/json/${ip}?fields=lat,lon`)
     return location.data
    }catch(err){
        return null
    
    }
    
}

let getIP = async (req, res) => {
    let ip = null
    try{
         await axios.get('http://ip-api.com/json').then(response => {
            ip = response.data.query
         })

            return res.json({ip: ip})
    }catch(err){
        return  res.json({err: err.toString()})
    }
}

let logIn = async (req, res) =>{
    let {contactNumber, password} = req.body
    let user = null
    try{
         user = await User.findOne({contactNumber: contactNumber, password: password})
        //  return res.json({"User": user})
    } catch(err){
        return res.json({err: err.toString()})
    }

    try{
        let location = await getGeolocation()
        user.latitude = location.lat
        user.longitude = location.lon
        // return res.json({location: location})
    }catch(err){
        return res.json({err: err.toString()})
    }

    try{
        await user.save()
        return res.json({user: user})
    }
    catch(err){
        return res.json({err: err.toString()})
    }

}

module.exports = {
    signUp,
    logIn,
    getGeolocation,
    getIP
}