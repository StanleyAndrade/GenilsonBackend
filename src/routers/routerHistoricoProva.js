const express = require('express')
const router = express()
router.use(express.json())
const cors = require('cors')
router.use(cors())
const historicoProvaModel = require('../models/historicoProva')

// CREATE
router.post('/historicoprova/criar', async (req, res) => {
    const {tituloProva, name, email, whatsapp, cpf} = req.body
    try {
        const novoHistoricoProva = new historicoProvaModel({tituloProva, name, email, whatsapp, cpf})
        await novoHistoricoProva.save()
        res.status(200).json(novoHistoricoProva)
    } catch (error) {
        res.status(500).json({ message: 'Erro interno ao criar histórico'})
    }
})

// READ
router.get('/historicoprova/get', async (req, res) => {
    try {
        const historicosprova = await historicoProvaModel.find()
        return res.status(200).json(historicosprova)
    } catch (error) {
        return res.status(500).json({message: 'Erro interno ao buscar histórico de provas'})
    }
})

module.exports = router
