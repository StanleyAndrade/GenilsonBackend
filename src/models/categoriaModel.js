// models/categoriaModel.js

const mongoose = require('mongoose');

const categoriaSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  userid: {
    type: String,
    required: false,
  },
  // Outros campos relevantes para sua categoria
}, {timestamps: true});

const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;
