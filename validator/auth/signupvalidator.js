const { body } = require('express-validator')
const User = require('../../models/User')

module.exports = [
    body('username')
        .isLength({min: 2, max: 30}).withMessage('Username must be 2 to 30 chars')
        .custom(async username => {
            let user = await User.findOne({ username });
            if (user) {
                return Promise.reject('Username already taken')
            }
        })
        .trim()
    ,
    body('email')
        .isEmail().withMessage('Please provide a valid email address')
        .custom(async email=>{
            let user = await User.findOne({ email })
            if(user){
                return Promise.reject('Email address already taken')
            }
        })
        .normalizeEmail()
    ,
    body('password')
        .isLength({ min: 4 }).withMessage('Password must be greater than 4 char')
    ,
    body('confirm_pass')
        .custom(async (confirmPassword, { req }) => {
            if(confirmPassword !== req.body.password){
                throw new Error('Confirm password does not match with password')
            }
        })
]