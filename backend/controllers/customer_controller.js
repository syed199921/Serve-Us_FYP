let customers = require('../data/customers.json')

let setLocation = (req, res) => {
    let {latitude, longitude, id} = req.body
    customers.forEach((customer) => {
        if(customer.id == id){
            customer.latitude = latitude
            customer.longitude = longitude
        }
    })

    return res.json({message: "Location updated", customers: customers})
}

module.exports = {
    setLocation
}