const express = require('express')
const {signUp, logIn} = require('../controllers/user_controller')

const router = express.Router()

//middleware
router.use(express.json())

router.post('/signup', signUp)
router.post('/login', logIn)

module.exports = router