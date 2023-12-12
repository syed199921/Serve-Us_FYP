const express = require('express')
const router = express.Router()

//middleware
router.use(express.json())

const {getNearbyTechnicians, setLocation, generateReviewScore, recommendTechnicians, getTechnician} = require('../controllers/technician_controller')
router.get('/get_technician', getTechnician)
router.get('/nearby_technicians', getNearbyTechnicians )
router.post('/location', setLocation)
router.get('/review_scores', generateReviewScore)
router.get('/recommend_technicians', recommendTechnicians)

module.exports = router