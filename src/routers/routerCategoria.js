const express = require('express');
const router = express.Router();
const Categoria = require('../models/categoriaModel');

// Rota para criar uma nova categoria
router.post('/categorias', async (req, res) => {
  try {
    const novaCategoria = new Categoria(req.body);
    await novaCategoria.save();
    res.status(201).json(novaCategoria);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para obter todas as categorias
router.get('/categorias', async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
