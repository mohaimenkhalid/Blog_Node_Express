const User = require('../models/User')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const errorFormatter = require('../utiles/validationErrorFormatter')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', {
        title: 'Create a new account',
        error: {},
        value: {}
    })
}

exports.signupPostController = async (req, res, next) => {
    let { username, email, password } = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){
        return res.render('pages/auth/signup', {
            title: 'Create a new account',
            error: errors.mapped(),
            value: {
                username, email
            }
        })
    }
    try {
        let hashedPassword = await bcrypt.hash(password, 11)
        let user = new User({
            username,
            email,
            password: hashedPassword
        })
        let createdUser = await user.save()
        console.log('User Created Successfully', createdUser)
        res.render('pages/auth/signup', {
            title: 'Create a new account',
            error: {},
            value: {}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
    res.render('pages/auth/signup', { title: 'Create a new account'})
}

exports.loginGetController = (req, res, next) => {
     res.render('pages/auth/login', { title: 'Login to your account', error: {}, error_message: ''})
}

exports.loginPostController = async (req, res, next) => {
    let { email, password } = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){
        console.log(errors.mapped())
        return res.render('pages/auth/login', {
            title: 'Login to your account',
            error: errors.mapped(),
            error_message: ''
        })
    }
    try {
        let user = await User.findOne({ email })
        if(!user){
            return res.render('pages/auth/login', {
                title: 'Login to your account',
                error: {},
                error_message: 'username or password is wrong',
            })
        }
        let match = await bcrypt.compare(password, user.password)
        if(!match) {
            return res.render('pages/auth/login', {
                title: 'Login to your account',
                error: {},
                error_message: 'username or password is wrong',
            })
        }
        res.setHeader('Set-cookie', 'isLoggedIn=true')
        res.render('pages/auth/login', { title: 'Login to your account', error: {}, error_message: ''})
    } catch (e) {
        
    }
}

exports.logoutController = (req, res, next) => {

}