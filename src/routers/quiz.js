// routes/quiz.js
const express = require('express');
const routerQuiz = express();
const cors = require('cors')
routerQuiz.use(cors())
const Quiz = require('../models/quiz');

// Criar um novo quiz.
routerQuiz.post('/create', async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).send(quiz);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obter um quiz pelo ID
routerQuiz.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }
    res.send(quiz);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = routerQuiz;
