const userController = require('../Controllers/userController')
const express = require('express')
const router = express.Router()

// GET route to sign in as a current User
router.get('/signin', userController.getUser)

// POST route to register as a new User
router.post('/register', userController.registerUser)

module.exports = router