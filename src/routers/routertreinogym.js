const express = require('express')
const routerTreinoGym = express()
routerTreinoGym.use(express.json())
const cors = require('cors')
routerTreinoGym.use(cors())
const TreinoGym = require('../models/treinogym')

routerTreinoGym.get('/treinogym/buscar', async (req, res) => {
    const all = await TreinoGym.find()
    try {
    return res.status(200).json(all)
   } catch (error) {
    return res.status(500).send('Deu erro' + error.message)
   }
})

// GET - Busca treino pelo id do usuário
routerTreinoGym.get('/treino/:userid', async (req, res) => {
    const { userid } = req.params;

    try {
        // Encontre as treino associadas ao userid fornecido
        const treino = await TreinoGym.find({ userid });

        // Verifique se foram encontradas treino
        if (!treino || treino.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhum treino encontrada para este usuário' });
        }

        // Se as treino foram encontradas, retorne-as
        return res.status(200).json(treino);
    } catch (error) {
        console.error('Erro ao buscar treino:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

routerTreinoGym.post('/treinogym/criar', async (req, res) => {
    const {treino1, treino2, treino3, treino4, treino5, treino6, treino7} = req.body
    try {
        const novoTreino = new TreinoGym({treino1, treino2, treino3, treino4, treino5, treino6, treino7})
        await novoTreino.save()
        res.status(200).json(novoTreino)
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
})

module.exports = routerTreinoGym