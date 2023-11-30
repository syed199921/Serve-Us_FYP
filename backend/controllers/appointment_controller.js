let technicians = require('../data/technicians.json')
let customers = require('../data/customers.json')
let appointments = require('../data/appointments.json')

let bookAppointment = (req, res) =>{
    let {technician_id, customer_id, date, time = req.body} = req.body
    let technician = technicians.find((technician) => technician.id == technician_id)
    let customer = customers.find((customer) => customer.id == customer_id)

    let appointment = {
        technician: technician,
        customer: customer,
        date: date,
        time: time
    }

    return res.json({appointment: appointment})
}

let viewAppointments = (req, res) => {
    let {customer_id} = req.body
    let customerAppointments = appointments.filter((appointment) => {
        if(appointment.customer.id == customer_id){
            return appointment
        }
    })

    return res.json({appointments: customerAppointments})

}

module.exports = {
    bookAppointment,
    viewAppointments
}