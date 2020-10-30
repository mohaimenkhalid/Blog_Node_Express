const { body } = require('express-validator')
module.exports = [
    body('email')
        .isLength({ min: 1 }).withMessage('Email field must not be empty')
        .isEmail().withMessage('Please enter a valid email address')
        .trim()
        .normalizeEmail()
    ,
    body('password')
        .isLength({ min: 1 }).withMessage('Password field must not be empty')
]