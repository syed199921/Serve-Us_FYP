const express = require('express')
const router = express.Router()

//middleware
router.use(express.json())

const {bookAppointment, viewAppointments, cancelAppointment} = require("../controllers/appointment_controller")

router.post('/book_appointment', bookAppointment)
router.get('/view_appointments', viewAppointments)
router.post('/cancel_appointment', cancelAppointment)

module.exports = router