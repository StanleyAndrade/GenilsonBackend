//importing Express
const express = require('express')
const db = express()
//signaling that it will be receive JSON
db.use(express.json())
//importing cors
const cors = require('cors')
db.use(cors())
//importing Model Produto
const Produto = require('../models/productModel')


// * =========================== ROUTERS =========================== *

// * ====== GET - Todos os produtos ====== *
db.get('/produtos/buscar', async (req, res) => {
  const all = await Produto.find()
  try {
  return res.status(200).json(all)
 } catch (error) {
  return res.status(500).send('Deu erro' + error.message)
 }
})
// * ====== GET - Todos os produtos ====== *

// Pega todos os produtos com o id do usuário
db.get('/produtos/user/:userid', async (req, res) => {
  const { userid } = req.params;
  try {
      const userProducts = await Produto.find({ userid });
      return res.status(200).json(userProducts);
  } catch (error) {
      return res.status(500).send('Erro ao buscar os pedidos do usuário: ' + error.message);
  }
});

// * ====== GET - Por categoria ====== *
db.get('/produtos/:categoriaId/:userid', async (req, res) => {
  try {
    const { categoriaId, userid } = req.params;
    const produtos = await Produto.find({ categoria: categoriaId, userid });
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// * ====== GET - Por categoria ====== *





// * ====== POST - Cadastra os Produtos ====== *
db.post('/produtos/criar', async (req, res) => {
    const { nome, descricao, tamanhos, sabores, preco, userid, imageUrl, imageKey, categoria } = req.body;
    
  
    try {
      const novoProduto = new Produto({ nome, descricao, tamanhos, sabores, preco, userid, imageUrl, imageKey, categoria });
      await novoProduto.save();
      res.status(200).json(novoProduto);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});
// * ====== POST - Cadastra os Produtos ====== *


// * ====== PATCH - Atualiza os produtos por ID ====== *
db.patch('/produtos/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, tamanhos, sabores, preco, userid, imageUrl, imageKey, } = req.body;
  
    try {
      const produtoAtualizado = await Produto.findByIdAndUpdate(
        id,
        { nome, descricao, tamanhos, sabores, preco, userid, imageUrl, imageKey, },
        { new: true } // Isso retorna o objeto atualizado em vez do antigo.
      );
  
      if (!produtoAtualizado) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
      }
  
      res.json(produtoAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor ao atualizar produto' });
    }
});
// * ====== PATCH - Atualiza os produtos por ID ====== *


// * ====== DELETE - Deleta os produtos ====== *
db.delete('/produtos/deletar/:id', async (req, res) => {
const { id } = req.params;

  try {
    await Produto.findByIdAndDelete(id);
    res.json({ mensagem: 'Produto apagado com sucesso' });
  } catch (error) {
    console.error('Erro ao apagar produto:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
})
// * ====== DELETE - Deleta os produtos ====== *

// * =========================== ROUTERS =========================== *

module.exports = db