const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')

//Import routes
const authRoute = require('./routes/authRoute')
const dashboardRoute = require('./routes/dashboardRoute')
//Import middleware
const { bindUserWithRequest } = require('./middleware/authMiddleware')
const setLocal = require('./middleware/setLocals')

const  mongoAtlasUri = "mongodb+srv://root:root@cluster0.zdrps.mongodb.net/blog-express?retryWrites=true&w=majority";
const store = new MongoDBStore({
    uri: mongoAtlasUri,
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2
});

const app = express();
// Setup view Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

//Middleware Array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store: store
    }),
    //session data bind into request
    bindUserWithRequest(),
    setLocal(),
    flash()
]
app.use(middleware)

app.use('/auth', authRoute)
app.use('/dashboard', dashboardRoute)

app.get('/', (req, res) => {
    res.json({'message': 'Home page'})
})

const PORT = process.env.PORT || 5000
//Connect with mongodb server

mongoose.connect(mongoAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then( () =>{
        app.listen(PORT, () => {
            console.log('Database is connected...')
            console.log(`Server is running on PORT ${PORT}...`);
        })
    })
    .catch(e =>{
        return console.log(e);
    })
