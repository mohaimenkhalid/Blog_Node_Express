const express = require('express')
const app = express();

app.get('/', () => {
    res.json({
        message : 'Hello Word'
    })
})

const PORT = process.env.PORT
app.listen(POST, () => {
    console.log(`server is running on port ${PORT}`)
})
