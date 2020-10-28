const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

//Import routes
const authRoute = require('./routes/authRoute')


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

app.use('/auth', authRoute)

app.get('/', (req, res) => {
    res.json({'message': 'Home page'})
})

const PORT = process.env.PORT || 5000
//Connect with mongodb server
const  mongoAtlasUri = "mongodb+srv://root:root@cluster0.zdrps.mongodb.net/blog-express?retryWrites=true&w=majority";
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
