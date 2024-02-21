// models/categoriaModel.js

const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  // Outros campos relevantes para sua categoria
});

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;
