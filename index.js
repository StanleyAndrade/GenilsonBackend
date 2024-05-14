//importing o dotenv
const dotenv = require('dotenv')
dotenv.config()

//importing MongoDB + Mongoose
const connectMongoDBWithMongoose = require('./src/database/connectMongoDBWithMongoose')
connectMongoDBWithMongoose()

//Importing Express and put inside "const app"
const express = require('express')
const morgan = require('morgan') //ajuda nas requisções http mostrando tipo e tempo de resposta
const app = express()
app.use(express.json()) //signaling that will receive JSON
app.use(express.urlencoded({extended: true})) //facilita a parte de envio de arquivos
app.use(morgan('dev'))
const cors = require('cors') //importing cors
app.use(cors())



// * ========== ROUTERS ======== *

// * ====== Product ====== *
const routerProduct = require('./src/routers/routerProduct')
app.use('/', routerProduct)

// * ====== User   ====== *
const routerUser = require('./src/routers/routerUser')
app.use('/', routerUser)

// * ====== UserStore   ====== *
const routerUserStore = require('./src/routers/routerUserStore')
app.use('/', routerUserStore)

// * ====== Categoria   ====== *
const routerCategoria = require('./src/routers/routerCategoria')
app.use('/', routerCategoria)

// * ====== UserStore   ====== *
const routerS3 = require('./src/routers/routerS3')
app.use('/', routerS3)

// Perimetria
const routerPerimetria = require('./src/routers/routerPerimetria')
app.use('/', routerPerimetria)

// Dobras Cutaneas
const routerDobrasCutaneas = require('./src/routers/routerDobrasCutaneas')
app.use('/', routerDobrasCutaneas)

// * ========== ROUTERS ======== *



//defining port
const port = 8080

//Function that will be executed when the server become online
app.listen(port, () => console.log(`Rodando com Express na porta ${port}`))