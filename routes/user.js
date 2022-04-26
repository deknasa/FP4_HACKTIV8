const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controllers')
// const userValidation = require("../midleware/joiValidation").userValidation

router.post('/register', userController.register)
// router.post('/login', userValidation, userController.login)

module.exports = router