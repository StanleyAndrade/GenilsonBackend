//importing o dotenv
const dotenv = require('dotenv')
dotenv.config()

//importing MongoDB + Mongoose
const connectMongoDBWithMongoose = require('./src/database/connectMongoDBWithMongoose')
connectMongoDBWithMongoose()

//Importing Express and put inside "const app"
const express = require('express')
const app = express()

//signaling that will receive JSON
app.use(express.json())

//importing cors
const cors = require('cors')
app.use(cors())



// * ========== ROUTERS ======== *

// * ====== home ====== *
const home = require('./src/routers/home')
app.use('/', home)

// * ====== db ====== *
const db = require('./src/routers/db')
app.use('/', db)

// * ====== pedido ====== *
const pedido = require('./src/routers/pedido')
app.use('/', pedido)

// * ========== ROUTERS ======== *



//defining port
const port = 8080

//Function that will be executed when the server become online
app.listen(port, () => console.log(`Rodando com Express na porta ${port}`))