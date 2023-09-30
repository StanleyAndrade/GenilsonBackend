//Databasepage

const axios = require('axios')

//importing Express
const express = require('express')
const db = express()

//signaling that it will be receive JSON
db.use(express.json())

//importing cors
const cors = require('cors')
db.use(cors())

//importing Model
const productModel = require('../models/productModel')

// * =========================== ROUTERS =========================== *

// * ====== GET - All collections ====== *
db.get('/alldata', async (req, res) => {
    const all = await productModel.find()
    try {
    return res.json(all)
   } catch (error) {
    return res.status(500).send('Deu erro' + error.message)
   }
})

// * ====== GET - ID - NÃO PEGOU ====== *

// * ====== POST ====== *
db.post('/create', async (req, res) => { 
    try {
        const product = await productModel.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).send('Deu erro' + error.message)
    }
})

// * ====== PATCH ====== *
db.patch('/create:id', async (req, res) => {
    const id = req.params.id
    try {
        const patch = new productModel.updateOne(req.body)
        //const update = await productModel.updateOne({ _id: id }) (NÃO PEGOU)
        res.status(200).json(update)
    } catch (error) {
        res.status(500).send('Deu erro' + error.message)
    }
})

// * ====== DELETE ====== *

// * =========================== ROUTERS =========================== *

module.exports = db