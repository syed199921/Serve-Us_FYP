const express = require('express')
const {signUp} = require('../controllers/user_controller')

const router = express.Router()

//middleware
router.use(express.json())

router.post('/signup', signUp)

