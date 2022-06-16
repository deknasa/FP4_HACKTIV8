const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controllers')
const authentication = require('../middleware/authentication').verify
const authorization = require('../middleware/authorization').userAuthorization

router.post('/register', userController.register)
router.post('/login', userController.login)
router.put(
    "/update/:id",
    authentication,
    authorization,
    userController.updateUser
);
router.delete(
    "/delete/:id",
    authentication,
    authorization,
    userController.deleteUser
);

module.exports = router