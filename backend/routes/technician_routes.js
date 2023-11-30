const express = require('express')
const router = express.Router()

//middleware
router.use(express.json())

const {getNearbyTechnicians, setLocation, generateReviewScore} = require('../controllers/technician_controller')

router.get('/nearby_technicians', getNearbyTechnicians )
router.post('/location', setLocation)
router.post('/review_scores', generateReviewScore)

module.exports = router