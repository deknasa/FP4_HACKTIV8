const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controllers')
const authentication = require('../middleware/authentication').verify
const authorization = require('../middleware/authorization').userAuthorization
const { userValidation } = require("../middleware/validation")

router.post('/register', userValidation.userSignUp, userController.register)
router.post('/login', userValidation.userSignIn, userController.login)
router.put(
    "/update/:id",
    authentication,
    authorization,
    userValidation.userUpdate,
    userController.updateUser
);
router.delete(
    "/delete/:id",
    authentication,
    authorization,
    userController.deleteUser
);

module.exports = router