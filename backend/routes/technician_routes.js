const express = require('express')
const router = express.Router()

//middleware
router.use(express.json())

const {getNearbyTechnicians} = require('../controllers/technician_controller')

router.get('/nearby_technicians', getNearbyTechnicians )

module.exports = router