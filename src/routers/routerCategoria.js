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

// Rota para buscar todas as categorias
router.get('/categorias', async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para editar categoria
router.patch(`/categorias/:id`, async (req, res) => {
  const { id } = req.params;
  const nome = req.body;
  try {
    const categoriaAtualizada = await Categoria.findByIdAndUpdate(id, {nome}, {new: true} /* Isso retorna o objeto atualizado em vez do antigo.*/ )
    if (!categoriaAtualizada) {
      return res.status(404).json({mensagem: 'Categoria não encontrada'})
    }
    // Remova esta linha ↓
    // res.json(categoriaAtualizada)
    return res.status(200).json({mensagem: 'Sucesso ao atualizar categoria'})
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor ao atualizar categoria' });
  }
})


// Rota para apagar Categoria
router.delete('/categoria/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Categoria.findByIdAndDelete(id)
    res.json({mensagem: 'Sucesso ao deletar categoria do MongoDB'})
  } catch (error) {
    console.error('Erro ao deletar categoria do MongoDB', error)
  }
})

module.exports = router;
