let technicians = require('../data/technicians.json')
let customers = require('../data/customers.json')
let appointments = require('../data/appointments.json')
const Appointment = require('../models/appointment_model')
const Customer = require('../models/customer_model')
const Technician = require('../models/technician_model')

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


// let bookAppointment = async (req, res) => {
//     let {technician_id, customer_id, date, time} = req.body;

//     let appointment = new Appointment({
//         technician: technician_id,
//         customer: customer_id,
//         date: date,
//         time: time
//     });
//     try {
//         let savedAppointment = await appointment.save();
//         return res.json({appointment: savedAppointment});
//     } catch (error) {
//         return res.status(500).json({error: error.toString()});
//     }
// }



let viewAppointments = (req, res) => {
    let {customer_id} = req.body
    let customerAppointments = appointments.filter((appointment) => {
        if(appointment.customer.id == customer_id){
            return appointment
        }
    })

    return res.json({appointments: customerAppointments})

}

//Customer viewing appointments

// let viewAppointments = async (req, res) => {
//     let {customer_id} = req.body;
//     try {
//         let customerAppointments = await Appointment.find({customer: customer_id});
//         let appointments = customerAppointments.map((appointment) => {
//            let technician = Technician.findById(appointment.technician);
//            return {
//                 id: appointment.id,
//                 technician: technician,
//                 date: appointment.date,
//                 time: appointment.time,
//                 status: appointment.status
//            }
//         });
//         return res.json({appointments: appointments});
//     } catch (error) {
//         return res.status(500).json({error: error.toString()});
//     }
// };

//Technician viewing appointments
// let viewAppointments = async (req, res) => {
//     let {technician_id} = req.body;
//     try {
//         let technicianAppointments = await Appointment.find({technician: technician_id});
//         let appointments = technicianAppointments.map((appointment) => {
//         if (appointment.status == "pending" || appointment.status == "accepted"){
//            let customer = Customer.findById(appointment.customer);
//            return {
//                 id: appointment.id,
//                 customer: customer,
//                 date: appointment.date,
//                 time: appointment.time,
//                 status: appointment.status
//            }
//         }
//         });

//         return res.json({appointments: appointments});
        
//     } catch (error) {
//         return res.status(500).json({error: error.toString()});
//     }
// };


let cancelAppointment = (req, res) => {
    let {appointment_id} = req.body
    let appointment = appointments.find((appointment) => appointment.id == appointment_id)
    let index = appointments.indexOf(appointment)
    appointments.splice(index, 1)
    return res.json({message: "Appointment cancelled", appointments: appointments})
}

// let updateAppointmentStatus = async (req, res) => {
//     let {appointment_id, status} = req.body;
//     try {
//         let appointment = await Appointment.findById(appointment_id);
//         appointment.status = status;
//         let savedAppointment = await appointment.save();
//         return res.json({appointment: savedAppointment});
//     } catch (error) {
//         return res.status(500).json({error: error.toString()});
//     }
// }


// let cancelAppointment = async (req, res) => {
//     let {appointment_id} = req.body;

//     try {
//         let deletedAppointment = await Appointment.findByIdAndRemove(appointment_id);
//         if(deletedAppointment) {
//             return res.json({message: "Appointment cancelled"});
//         } else {
//             return res.status(404).json({message: "Appointment not found"});
//         }
//     } catch (error) {
//         return res.status(500).json({error: error.toString()});
//     }
// };

module.exports = {
    bookAppointment,
    viewAppointments,
    cancelAppointment,
}