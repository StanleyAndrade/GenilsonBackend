const express = require('express');
const routerURL = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/authMiddleware');
const UrlProva = require('../models/urlprovaModel')
const UrlCurso = require('../models/urlcursoModel')

routerURL.use(express.json());
routerURL.use(cors());

// Rota para criar url das PROVAS

// Rota para buscar todos os treinos
routerURL.get('/prova/buscar', async (req, res) => {
    try {
        const all = await UrlProva.find();
        return res.status(200).json(all);
    } catch (error) {
        return res.status(500).send('Deu erro' + error.message);
    }
});

routerURL.post('/prova/criar', authenticateToken, async (req, res) => {
    const { urlprova } = req.body;
    try {
        const novaProva = new UrlProva({ urlprova });
        await novaProva.save();
        res.status(200).json(novaProva);
    } catch (error) {
        console.error('Erro ao criar prova:', error);
        res.status(500).json({ mensagem: 'Você pode não estar logado' }); 
    }
});

// Rota para atualizar treino pelo ID
routerURL.patch('/prova/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const provaAtualizado = await UrlProva.findByIdAndUpdate(id, updates, { new: true });
        if (!provaAtualizado) {
            return res.status(404).json({ mensagem: 'prova não encontrado' });
        }
        res.status(200).json(provaAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar prova:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

// Rota para deletar treino por ID
routerURL.delete('/prova/:id', authenticateToken, async (req, res) => {
    const provaId = req.params.id;

    try {
        await UrlProva.findByIdAndDelete(provaId);
        res.status(200).json({ message: 'prova deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar prova:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// Rota para criar url do CURSO

// Rota para buscar todos os treinos
routerURL.get('/urlcurso/buscar', async (req, res) => {
    try {
        const all = await UrlCurso.find();
        return res.status(200).json(all);
    } catch (error) {
        return res.status(500).send('Deu erro' + error.message);
    }
});

routerURL.post('/urlcurso/criar', authenticateToken, async (req, res) => {
    const { urlcurso } = req.body;
    try {
        const novoCurso = new UrlCurso({ urlcurso });
        await novoCurso.save();
        res.status(200).json(novoCurso);
    } catch (error) {
        console.error('Erro ao criar curso:', error);
        res.status(500).json({ mensagem: 'Você pode não estar logado' }); 
    }
});

// Rota para atualizar treino pelo ID
routerURL.patch('/urlcurso/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const cursoAtualizado = await UrlCurso.findByIdAndUpdate(id, updates, { new: true });
        if (!cursoAtualizado) {
            return res.status(404).json({ mensagem: 'curso não encontrado' });
        }
        res.status(200).json(cursoAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar curso:', error);
        res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});

// Rota para deletar treino por ID
routerURL.delete('/urlcurso/:id', authenticateToken, async (req, res) => {
    const cursoId = req.params.id;

    try {
        await UrlCurso.findByIdAndDelete(cursoId);
        res.status(200).json({ message: 'curso deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar curso:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

module.exports = routerURL;