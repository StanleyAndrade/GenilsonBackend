const express = require('express')
const routerDobrasCutaneas = express()
routerDobrasCutaneas.use(express.json()) // signaling that it will receive JSON
//Importing cors
const cors = require('cors')
routerDobrasCutaneas.use(cors())
//Importing model 
const DobrasCutaneasModel = require('../models/dobracutaneaModel')

// Post
routerDobrasCutaneas.post('/dobrascutaneas/criar', async (req, res) => {
    const { subescapular, triciptal, abdominal, suprailiaca, peitoral, coxa, biciptal, axilarmedia, panturrilhamedia, somatoriodasdobras, resultadopercentualdegordura, pesoatual, pesogordo, pesomagro, pesoideal, idade, userid, storeid} = req.body
    try {
        const novaDobraCutanea = new DobrasCutaneasModel({ subescapular, triciptal, abdominal, suprailiaca, peitoral, coxa, biciptal, axilarmedia, panturrilhamedia, somatoriodasdobras, resultadopercentualdegordura, pesoatual, pesogordo, pesomagro, pesoideal, idade, userid, storeid})
        await novaDobraCutanea.save()
        res.status(200).json(novaDobraCutanea)
    } catch (error) {
        console.error('Erro ao criar Nova Dobra:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
})

// GET - Busca perimetrias pelo id do usuário
routerDobrasCutaneas.get('/dobrascutaneas/:userid', async (req, res) => {
    const { userid } = req.params;

    try {
        // Encontre as perimetrias associadas ao userid fornecido
        const dobrascutaneas = await DobrasCutaneasModel.find({ userid });

        // Verifique se foram encontradas dobrascutaneas
        if (!dobrascutaneas || dobrascutaneas.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhuma perimetria encontrada para este usuário' });
        }

        // Se as dobrascutaneas foram encontradas, retorne-as
        return res.status(200).json(dobrascutaneas);
    } catch (error) {
        console.error('Erro ao buscar dobrascutaneas:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

// GET - Busca perimetrias pelo id do usuário
routerDobrasCutaneas.get('/dobrascutaneasPersonal/:storeid', async (req, res) => {
    const { storeid } = req.params;

    try {
        // Encontre as perimetrias associadas ao storeid fornecido
        const dobrascutaneas = await DobrasCutaneasModel.find({ storeid });

        // Verifique se foram encontradas dobrascutaneas
        if (!dobrascutaneas || dobrascutaneas.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhuma perimetria encontrada para este usuário' });
        }

        // Se as dobrascutaneas foram encontradas, retorne-as
        return res.status(200).json(dobrascutaneas);
    } catch (error) {
        console.error('Erro ao buscar dobrascutaneas:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});


module.exports = routerDobrasCutaneas

                                                                                                                                                                                                                                                  