const express = require('express');
const routerGabarito = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/authMiddleware');
const GabaritoModel = require('../models/gabaritoModel')

routerGabarito.use(express.json());
routerGabarito.use(cors());

// Rota para buscar todos os gabaritos
routerGabarito.get('/gabarito/buscar', async (req, res) => {
    try {
        const all = await GabaritoModel.find();
        return res.status(200).json(all);
    } catch (error) {
        return res.status(500).send('Deu erro' + error.message);
    }
});

// Rota para buscar o perfil do usuário pelo nome de usuário e exibir na url
routerGabarito.get('/gabarito/:titulo', async (req, res) => {
    try {
        const titulo = req.params.titulo;
        const gabarito = await GabaritoModel.findOne({ titulo });
  
        if (!gabarito) {
            return res.status(404).json({ message: 'Gabarito não encontrado' });
        }
  
        // Retorne os detalhes do usuário, como desejado
        return res.status(200).json(url);
    } catch (error) {
        console.error('Erro ao buscar gabarito:', error);
        res.status(500).json({ message: 'Erro ao buscar gabarito', });
    }
});

routerGabarito.post('/gabarito/criar', authenticateToken, async (req, res) => {
    const { titulo, conteudogabarito} = req.body;
    try {
        const novoGabarito = new GabaritoModel({ titulo, conteudogabarito});
        await novoGabarito.save();
        res.status(200).json(novoGabarito);
    } catch (error) {
        console.error('Erro ao criar gabarito:', error);
        res.status(500).json({ mensagem: 'Você pode não estar logado' }); 
    }
});

// Rota para atualizar treino pelo ID
routerGabarito.patch('/gabarito/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const gabaritoAtualizado = await GabaritoModel.findByIdAndUpdate(id, updates, { new: true });
        if (!gabaritoAtualizado) {
            return res.status(404).json({ mensagem: 'gabarito não encontrado' });
        }
        res.status(200).json(gabaritoAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar gabarito:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

// Rota para deletar treino por ID
routerGabarito.delete('/gabarito/:id', authenticateToken, async (req, res) => {
    const gabaritoId = req.params.id;

    try {
        await GabaritoModel.findByIdAndDelete(gabaritoId);
        res.status(200).json({ message: 'gabarito deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar gabarito:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

module.exports = routerGabarito;