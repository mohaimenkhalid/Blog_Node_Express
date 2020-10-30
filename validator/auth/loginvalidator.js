const { body } = require('express-validator')
module.exports = [
    body('email')
        .not().isEmpty().withMessage('Email field must not be empty')
        .isEmail().withMessage('Please enter a valid email address')
        .trim()
        .normalizeEmail()
    ,
    body('password')
        .not().isEmpty().withMessage('Password field must not be empty')
]