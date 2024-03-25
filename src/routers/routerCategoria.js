const express = require('express');
const routerCategoria = express.Router();
const Categoria = require('../models/categoriaModel');

// Rota para buscar todas as categorias - NÃO VAI SER MAIS USADA
routerCategoria.get('/categorias/buscar', async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para buscar categorias do usuário
routerCategoria.get('/categorias/user/:userid', async (req, res) => {
  const { userid } = req.params;
  try {
      const userCategories = await Categoria.find({ userid });
      return res.status(200).json(userCategories);
  } catch (error) {
      return res.status(500).send('Erro ao buscar as categorias do usuário: ' + error.message);
  }
});


// Rota para criar uma nova categoria
routerCategoria.post('/categorias/criar', async (req, res) => {
  const {nome, userid} = req.body
  try {
    const novaCategoria = new Categoria({nome, userid});
    await novaCategoria.save();
    res.status(200).json(novaCategoria);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH - Rota para editar categoria por ID
routerCategoria.patch('/categorias/editar/:id', async (req, res) => {
  const { id } = req.params;
  const {nome, userid} = req.body;

  try {
    const categoriaAtualizada = await Categoria.findByIdAndUpdate(id, {nome, userid}, {new: true} /* Isso retorna o objeto atualizado em vez do antigo.*/ )
    
    if (!categoriaAtualizada) {
      return res.status(404).json({mensagem: 'Categoria não encontrada'})
    }
    res.json(categoriaAtualizada)
    //return res.status(200).json({mensagem: 'Sucesso ao atualizar categoria', categoriaAtualizada})
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor ao atualizar categoria' });
  }
})


// Rota para apagar Categoria
routerCategoria.delete('/categoria/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Categoria.findByIdAndDelete(id)
    res.json({mensagem: 'Sucesso ao deletar categoria do MongoDB'})
  } catch (error) {
    console.error('Erro ao deletar categoria do MongoDB', error)
  }
})

module.exports = routerCategoria;
