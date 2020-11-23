const router = require('express').Router();
const signupValidation = require('../validator/auth/signupvalidator')
const loginValidation = require('../validator/auth/loginvalidator')
const { isUnauthenticated } = require('../middleware/authMiddleware')
const {
        signupGetController,
        signupPostController,
        loginGetController,
        loginPostController,
        logoutController
    } = require('../controllers/authController')

router.get('/signup', isUnauthenticated, signupGetController)
router.post('/signup', isUnauthenticated, signupValidation, signupPostController)

router.get('/login', isUnauthenticated, loginGetController)
router.post('/login', isUnauthenticated, loginValidation, loginPostController)

router.get('/logout', logoutController)


module.exports = router