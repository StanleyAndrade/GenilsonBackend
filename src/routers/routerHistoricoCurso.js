const express = require('express')
const router = express()
router.use(express.json())
const cors = require('cors')
router.use(cors())
const historicoCursoModel = require('../models/historicoCurso')

// CREATE
router.post('/historicocurso/criar', async (req, res) => {
    const {tituloCurso, name, email, whatsapp, cpf} = req.body
    try {
        const novoHistoricoCurso = new historicoCursoModel({tituloCurso, name, email, whatsapp, cpf})
        await novoHistoricoCurso.save()
        res.status(200).json(novoHistoricoCurso)
    } catch (error) {
        res.status(500).json({ message: 'Erro interno ao criar histórico'})
    }
})

// READ
router.get('/historicocurso/get', async (req, res) => {
    try {
        const historicoscurso = await historicoCursoModel.find()
        return res.status(200).json(historicoscurso)
    } catch (error) {
        return res.status(500).json({message: 'Erro interno ao buscar histórico cursos'})
    }
})

module.exports = router
