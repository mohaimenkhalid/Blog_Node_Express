const User = require('../models/User')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const errorFormatter = require('../utiles/validationErrorFormatter')
const Flash = require('../utiles/Flash')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', {
        title: 'Create a new account',
        error: {},
        value: {},
        flashMessage: Flash.getMessage(req)
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
            },
            flashMessage: Flash.getMessage(req)
        })
    }
    try {
        let hashedPassword = await bcrypt.hash(password, 11)
        let user = new User({
            username,
            email,
            password: hashedPassword
        })
        await user.save()
        req.flash('success', 'User created successfully!')
        res.redirect('/auth/login')
    } catch (e) {
        console.log(e)
        next(e)
    }
    res.render('pages/auth/signup', {
        title: 'Create a new account',
        flashMessage: Flash.getMessage(req)
    })
}

exports.loginGetController = (req, res, next) => {
     res.render('pages/auth/login', {
         title: 'Login to your account',
         error: {},
         error_message: '',
         flashMessage: Flash.getMessage(req)
     })
}

exports.loginPostController = async (req, res, next) => {
    let { email, password } = req.body
    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){
        req.flash('fail', 'Error occurred!')
        return res.render('pages/auth/login', {
            title: 'Login to your account',
            error: errors.mapped(),
            flashMessage: Flash.getMessage(req)
        })
    }
    try {
        let user = await User.findOne({ email })
        if(!user){
            req.flash('fail', 'Username or Password is wrong!')
            return res.render('pages/auth/login', {
                title: 'Login to your account',
                error: {},
                flashMessage: Flash.getMessage(req)
            })
        }
        let match = await bcrypt.compare(password, user.password)
        if(!match) {
            req.flash('fail', 'Username or Password is wrong!')
            return res.render('pages/auth/login', {
                title: 'Login to your account',
                error: {},
                flashMessage: Flash.getMessage(req)
            })
        }
        req.session.isLoggedIn = true
        req.session.user = user
        req.session.save()
        req.flash('success', 'Login Successfully!')
        res.redirect('/dashboard')
    } catch (e) {
        console.log(e)
    }
}

exports.logoutController = (req, res, next) => {
    req.session.destroy(err => {
        if(err){
            console.log(e)
          return next(e)
        }
        return res.redirect('/auth/login')
    })
}