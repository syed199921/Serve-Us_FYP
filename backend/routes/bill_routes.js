const express = require('express')

const router = express.Router()

//middleware
router.use(express.json())

const {generateBill} = require('../controllers/bill_controller')

router.post('/generate_bill', generateBill)

module.exports = router