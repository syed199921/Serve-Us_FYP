const express = require('express')
const {signUp, logIn, getGeolocation, getIP} = require('../controllers/user_controller')

const router = express.Router()

//middleware
router.use(express.json())

router.post('/signup', signUp)
router.post('/login', logIn)
router.get('/get_geolocation', getGeolocation )
router.get('/get_ip', getIP)

module.exports = router