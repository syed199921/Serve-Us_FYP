const express = require('express')
const router = express.Router()

//middleware
router.use(express.json())

const {bookAppointment, viewAppointments} = require("../controllers/appointment_controller")

router.post('/book_appointment', bookAppointment)
router.get('/view_appointments', viewAppointments)

module.exports = router