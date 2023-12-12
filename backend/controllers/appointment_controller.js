let technicians = require('../data/technicians.json')
let customers = require('../data/customers.json')
let appointments = require('../data/appointments.json')
const Appointment = require('../models/appointment_model')
const Customer = require('../models/customer_model')
const Technician = require('../models/technician_model')
             
let bookAppointment = async (req, res) => {
    let {technician, customer, date, time} = req.body;
    let appointmentTechnician = null;
    try{
        appointmentTechnician = await Technician.findById(technician);
    }catch(err){
        return res.json({err: err.toString()})
    }

    let appointmentCustomer = null;
    try{
        appointmentCustomer = await Customer.findById(customer);
       
    }catch(err){
        return res.json({err: err.toString()})
    }

    let appointment = new Appointment({
        technician: technician,
        customer: customer,
        date: date,
        time: time
    });
    try {
         await appointment.save();
        return res.json({appointment: appointment, customer: appointmentCustomer, technician: appointmentTechnician});
    } catch (error) {
        return res.status(500).json({error: error.toString()});
    }
}



// let viewAppointments = (req, res) => {
//     let {customer_id} = req.body
//     let customerAppointments = appointments.filter((appointment) => {
//         if(appointment.customer.id == customer_id){
//             return appointment
//         }
//     })

//     return res.json({appointments: customerAppointments})

// }

// Customer viewing appointments

let viewCustomerAppointments = async (req, res) => {
    let {customer} = req.body;
    let customerAppointments = null
    try {
         customerAppointments = await Appointment.find({customer: customer});
        } catch (error) {
        return res.status(500).json({error: error.toString()});
    }
        let appointments = customerAppointments.map(async (appointment) => {
            // if(appointment.status !== 'cancelled'){
            let technician = null;
            try {
                technician = await Technician.findById(appointment.technician);
            } catch (err) {
                return res.json({ err: err.toString() });
            }
            return {
                _id: appointment._id,
                technician: technician,
                date: appointment.date,
                time: appointment.time,
                status: appointment.status
            };
        // }
        });
        appointments = await Promise.all(appointments);

   return res.json({appointments: appointments});
};

//Technician viewing appointments
let viewTechnicianAppointments = async (req, res) => {
    let {technician} = req.body;
    let technicianAppointments = null
    try {
         technicianAppointments = await Appointment.find({technician: technician});
        
    } catch (error) {
        return res.status(500).json({error: error.toString()});
    }
        let appointments = technicianAppointments.map( async (appointment) => {
        if (appointment.status == "pending" || appointment.status == "accepted"){
           let customer = await Customer.findById(appointment.customer);
           return {
                _id: appointment._id,
                customer: customer,
                date: appointment.date,
                time: appointment.time,
                status: appointment.status
           }
        }
        });

        appointments = await Promise.all(appointments)

        return res.json({appointments: appointments})

        
};


let updateAppointmentStatus = async (req, res) => {
    let {appointment_id, status} = req.body
    let appointment = null
    try{
         appointment = await Appointment.findById(appointment_id)
    }catch(err){
        return res.json({err: err.toString()})
    }
    appointment.status = status

    try{
        await appointment.save()
        return res.json({message:`Appointment ${appointment.status}`, appointment: appointment})
    }catch(err){
        return res.json({err: err.toString()})
    }
    
}

let editAppointment = async (req, res) => {
    let {appointment_id, date, time} = req.body
    let appointment = null
    try{
         appointment = await Appointment.findById(appointment_id)
    }catch(err){
        return res.json({err: err.toString()})
    }
    if(appointment.status === "pending"){
    appointment.date = date
    appointment.time = time
    

    try{
        await appointment.save()
        return res.json({message: "Appointment edited", appointment: appointment})
    }catch(err){
        return res.json({err: err.toString()})
    }
}
else {
    return res.json({message: `Appointment cannot be edited becasue the appointment is ${appointment.status}`})
}
    
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
    viewCustomerAppointments,
    viewTechnicianAppointments,
    updateAppointmentStatus,
    editAppointment
}