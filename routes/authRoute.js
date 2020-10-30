const router = require('express').Router();
const signupValidation = require('../validator/auth/signupvalidator')
const loginValidation = require('../validator/auth/loginvalidator')
const {
        signupGetController,
        signupPostController,
        loginGetController,
        loginPostController,
        logoutController
    } = require('../controllers/authController')

router.get('/signup', signupGetController)
router.post('/signup', signupValidation, signupPostController)

router.get('/login', loginGetController)
router.post('/login', loginValidation, loginPostController)

router.get('/logout', logoutController)


module.exports = router