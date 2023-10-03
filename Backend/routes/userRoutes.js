const express = require('express')
const { registerUser, loginUser, loggingOutUser, forgotPassword, resetPassword } = require('../Controllers/userController')
const router = express.Router()

//userRoutes
router.route('/signup').post(registerUser)
router.route('/login').post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route('/logout').get(loggingOutUser)

module.exports = router;