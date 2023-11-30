let technicians = require('../data/technicians.json')
let customers = require('../data/customers.json')
let appointments = require('../data/appointments.json')

let bookAppointment = (req, res) =>{
    let {technician_id, customer_id, date, time = req.body} = req.body
    let technician = technicians.find((technician) => technician.id == technician_id)
    let customer = customers.find((customer) => customer.id == customer_id)

    let appointment = {
        id: appointments.length + 1,
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

let cancelAppointment = (req, res) => {
    let {appointment_id} = req.body
    let appointment = appointments.find((appointment) => appointment.id == appointment_id)
    let index = appointments.indexOf(appointment)
    appointments.splice(index, 1)
    return res.json({message: "Appointment cancelled", appointments: appointments})
}

module.exports = {
    bookAppointment,
    viewAppointments,
    cancelAppointment
}