const express = require('express')
const router = express.Router()

//middleware
router.use(express.json())

const {setLocation} = require('../controllers/customer_controller')

router.post('/location', setLocation)

module.exports = router