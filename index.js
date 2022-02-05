//INITIAL CONFIG
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()


// READ JSON / MIDDLEWARES
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//API Routes 
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

//INITIAL ROUTE / END POINT
app.get('/', (req, res) => {

    res.json({ message: 'Oi Express!' })
})

//LISTENING PORTS
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.hwact.mongodb.net/BancoDaAPI?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("Conectado ao MongoDB!")
        app.listen(3000)

    })
    .catch((err) => console.log(err))
