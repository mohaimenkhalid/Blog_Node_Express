const express = require('express')
const morgan = require('morgan')

const app = express();
// Setup view Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

//Middleware Array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json()
]
app.use(middleware)

app.get('/', (req, res) => {
    res.render('pages/auth/signup', { title : 'Create a new account'})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
