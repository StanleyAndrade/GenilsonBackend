const express = require('express')
const routerPerimetria = express()
routerPerimetria.use(express.json()) // signaling that it will receive JSON
//Importing cors
const cors = require('cors')
routerPerimetria.use(cors())
//Importing model 
const PerimetriaModel = require('../models/perimetriaModel')

// POST 
routerPerimetria.post('/perimetria/criar', async (req, res) => {
    const {bracoRelaxadoEsquerdo, bracoRelaxadoDireito, bracoContraidoEsquerdo, bracoContraidoDireito, antebracoDireito, antebracoEsquerdo, pernaDireito, pernaEsquerdo, torax, abdomen, quadril, userid, storeid} = req.body
    try { 
        const novaPerimetria = new PerimetriaModel({bracoRelaxadoEsquerdo, bracoRelaxadoDireito, bracoContraidoEsquerdo, bracoContraidoDireito, antebracoDireito, antebracoEsquerdo, pernaDireito, pernaEsquerdo, torax, abdomen, quadril, userid, storeid})
        await novaPerimetria.save()
        res.status(200).json(novaPerimetria)
    } catch (error) {
        console.error('Erro ao criar Nova Perimetria:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
})

// GET - Busca perimetrias pelo id do usuário
routerPerimetria.get('/perimetria/:userid', async (req, res) => {
    const { userid } = req.params;

    try {
        // Encontre as perimetrias associadas ao userid fornecido
        const perimetrias = await PerimetriaModel.find({ userid });

        // Verifique se foram encontradas perimetrias
        if (!perimetrias || perimetrias.length === 0) {
            return res.status(404).json({ mensagem: 'Nenhuma perimetria encontrada para este usuário' });
        }

        // Se as perimetrias foram encontradas, retorne-as
        return res.status(200).json(perimetrias);
    } catch (error) {
        console.error('Erro ao buscar perimetrias:', error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

module.exports = routerPerimetria

                                                                                                                                                                                                                                                  