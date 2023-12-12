const express = require('express')
const router = express.Router()

//middleware
router.use(express.json())

const {bookAppointment, viewCustomerAppointments, viewTechnicianAppointments, updateAppointmentStatus, editAppointment} = require("../controllers/appointment_controller")

router.post('/book_appointment', bookAppointment)
router.get('/view_customer_appointments', viewCustomerAppointments)
router.get('/view_technician_appointments', viewTechnicianAppointments)
router.post('/update_appointment', updateAppointmentStatus)
router.post('/edit_appointment', editAppointment)

module.exports = router