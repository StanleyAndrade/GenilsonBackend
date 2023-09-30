//homepage route

//importing Express and initializing
const express = require('express')
const home = express()

//signaling that it will be receive JSON
home.use(express.json())

// * =========================== ROUTERS =========================== *

// * ====== GET ====== *
home.get('/home', async (req, res) => {
    res.send('Eu sou a página home atualizada')
})

// * =========================== ROUTERS =========================== *

module.exports = home