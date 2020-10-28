const router = require('express').Router();
const { body, validationResult } = require('express-validator')
const User = require('../models/User.js')

const {
        signupGetController,
        signupPostController,
        loginGetController,
        loginPostController,
        logoutController
    } = require('../controllers/authController')
const signupValidation = [
        body('username')
            .isLength({min: 2, max: 30}).withMessage('Username must be 2 to 30 chars')
            .custom(async username => {
                    let user = await User.findOne({ username });
                    if (user) {
                            return Promise.reject('Username already taken.')
                    }
            }),
        body('email')
            .isEmail().withMessage('Please provide a valid email address.')
            .custom(async email=>{
                    let user = await User.findOne({ email })
                    if(user){
                         return Promise.reject('Email address already taken')
                    }
            })
]
router.get('/signup', signupGetController)
router.post('/signup', signupPostController)

router.get('/login', loginGetController)
router.post('/login', loginPostController)

router.get('/logout', logoutController)


module.exports = router