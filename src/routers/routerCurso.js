const express = require('express');
const routerCurso = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/authMiddleware');
const Curso = require('../models/cursoModel')

routerCurso.use(express.json());
routerCurso.use(cors());

// Rota para buscar todos os treinos
routerCurso.get('/curso/buscar', async (req, res) => {
    try {
        const all = await Curso.find();
        return res.status(200).json(all);
    } catch (error) {
        return res.status(500).send('Deu erro' + error.message);
    }
});

routerCurso.post('/curso/criar', authenticateToken, async (req, res) => {
    const { titulo, conteudo, nameUrl } = req.body;
    try {
        const novoCurso = new Curso({ titulo, conteudo, nameUrl });
        await novoCurso.save();
        res.status(200).json(novoCurso);
    } catch (error) {
        console.error('Erro ao criar curso:', error);
        res.status(500).json({ mensagem: 'Você pode não estar logado' }); 
    }
});

// Rota para atualizar treino pelo ID
routerCurso.patch('/curso/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const cursoAtualizado = await Curso.findByIdAndUpdate(id, updates, { new: true });
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
routerCurso.delete('/curso/:id', authenticateToken, async (req, res) => {
    const cursoId = req.params.id;

    try {
        await Curso.findByIdAndDelete(cursoId);
        res.status(200).json({ message: 'curso deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar curso:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

module.exports = routerCurso;