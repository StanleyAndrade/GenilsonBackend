//importing Express
const express = require('express')
const routerPedido = express()

//signaling that it will be receive JSON
routerPedido.use(express.json())

//importing cors
const cors = require('cors')
routerPedido.use(cors())

//importing Model
const Pedido = require('../models/pedidoModel')



// * =========================== ROUTERS =========================== *

// * ========================= GET - All collections ========================= *
routerPedido.get('/pedidos', async (req, res) => {
    const all = await Pedido.find()
    try {
    return res.status(200).json(all)
   } catch (error) {
    return res.status(500).send('Deu erro' + error.message)
   }
})
// * ========================= GET - All collections ========================= *



// * ========================= POST ========================= *
routerPedido.post('/pedidos', async (req, res) => {
    const { nome, descricao, tamanhos, sabores, preco } = req.body;
  
    try {
      const novoPedido = new Pedido({ nome, descricao, tamanhos, sabores, preco });
      const pedidoSalvo = await novoPedido.save();
      res.json(pedidoSalvo);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});
// * ========================= POST ========================= *



// * ========================= PATCH ========================= *
// Rota para atualizar um produto por ID.
routerPedido.patch('/pedidos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, tamanhos, sabores, preco } = req.body;
  
    try {
      const produtoAtualizado = await Pedido.findByIdAndUpdate(
        id,
        { nome, descricao, tamanhos, sabores, preco },
        { new: true } // Isso retorna o objeto atualizado em vez do antigo.
      );
  
      if (!pedidoAtualizado) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
      }
  
      res.json(pedidoAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
});
// * ========================= PATCH ========================= *




// * ========================= DELETE - deletar produto individualmente ========================= *
routerPedido.delete('/pedidos/:id', async (req, res) => {
const { id } = req.params;

  try {
    await Pedido.findByIdAndDelete(id);
    res.json({ mensagem: 'Produto apagado com sucesso' });
  } catch (error) {
    console.error('Erro ao apagar produto:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
})
// * ========================= DELETE - deletar produto individualmente ========================= *

// * ========================= DELETE - TUDO ========================= *
routerPedido.delete('/pedidos', async (req, res) => {
const { id } = req.params;

  try {
    await Pedido.deleteMany();
    res.json({ mensagem: 'Produto apagado com sucesso' });
  } catch (error) {
    console.error('Erro ao apagar produto:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
})
// * ========================= DELETE - TUDO ========================= *


// * =========================== ROUTERS =========================== *

module.exports = routerPedido