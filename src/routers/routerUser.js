//importing Express
const express = require('express')
const routerUser = express()

//importing cors
const cors = require('cors')
routerUser.use(cors())

//importing bcrypt
const bcrypt = require('bcrypt')

//importing JWT
const jwt = require('jsonwebtoken')

//importing BodyParser
const bodyParser = require('body-parser')

//importing Model
const User = require('../models/UserModel')

//signaling that it will be receive JSON
routerUser.use(bodyParser.json())

const cookieParser = require("cookie-parser") 

routerUser.use(cookieParser())

// * ==================== GET - Pega todos os usuários ==================== *
routerUser.get('/user', async (req, res) => {
    const all = await User.find()
    try {
      return res.status(200).json({message: 'Todos os usuários', data: all})
    } catch (error) {
      return res.status(500).json({message: 'Erro ao buscar usuários', error: error.message})
    }
})

//*===================== LOGIN =====================*
routerUser.get('/user/:email', async (req, res) => {
  try {
      const email = req.params.email; // Obtenha o e-mail da consulta

      // Verifique se o e-mail está presente
      if (!email) {
          return res.status(400).json({ message: 'E-mail não fornecido' });
      }

      // Encontre o usuário pelo e-mail
      const user = await User.findOne({ email });
      
      // Verifique se o usuário foi encontrado
      if (!user) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Se o usuário foi encontrado, retorne seus dados
      return res.status(200).json({message: 'Login feito com sucesso', user});
  } catch (error) {
      return res.status(500).send('Erro no servidor ao fazer login');
  }
});


//===================== CADASTRAR USUÁRIO =====================
routerUser.post('/user/criar', (req, res) => {
  const { name, phone, email, password, username } = req.body;

  // Verifique se o email ou username já existe
  User.findOne({ $or: [{ email }, { username }] })
      .then((existingUser) => {
          if (existingUser) {
              if (existingUser.email === email) {
                  return res.status(400).json({ message: 'Email já existe' });
              }
              if (existingUser.username === username) {
                  return res.status(400).json({ message: 'Username já existe' });
              }
          }

          // Criptografe a senha do usuário
          bcrypt.hash(password, 10)
              .then((hashedPassword) => {

                  // Crie o novo usuário
                  const newUser = new User({
                      name,
                      phone,
                      email,
                      password: hashedPassword,
                      username
                  });

                  // Salve o usuário no banco de dados
                  newUser.save()
                      .then((savedUser) => {
                          const { _id } = savedUser;
                          res.status(201).json({
                              message: 'Usuário registrado com sucesso',
                              user: {
                                  _id,
                                  name,
                                  phone,
                                  email,
                                  password: hashedPassword,
                                  username
                              }
                          });
                      })
                      .catch((error) => {
                          res.status(500).json({ message: 'Erro ao criar usuário' });
                      });
              })
              .catch((error) => {
                  res.status(500).json({ message: 'Erro ao criar usuário' });
              });
      })
      .catch((error) => {
          console.error('Erro ao verificar usuário existente:', error);
          res.status(500).json({ message: 'Erro ao verificar usuário existente' });
      });
});

//===================== CHECAR DISPONIBILIDADE DO USERNAME =====================
routerUser.get('/user/check-username/:username', (req, res) => {
  const { username } = req.params;

  User.findOne({ username })
      .then((existingUser) => {
          if (existingUser) {
              return res.status(200).json({ available: false });
          } else {
              return res.status(200).json({ available: true });
          }
      })
      .catch((error) => {
          console.error('Erro ao verificar username:', error);
          res.status(500).json({ message: 'Erro ao verificar username' });
      });
});



// Rota para buscar o perfil do usuário pelo nome de usuário e exibir na url
routerUser.get('/:username', async (req, res) => {
  try {
      const username = req.params.username;
      const user = await User.findOne({ username });

      if (!user) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Retorne os detalhes do usuário, como desejado
      return res.status(200).json(user);
  } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ message: 'Erro ao buscar usuário', });
  }
});

//*===================== lOGIN =====================*
routerUser.post('/user/login', (req, res) => {
  const { email, password } = req.body;

  // Encontre o usuário pelo email
  User.findOne({ email }) 
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      // Verifique a senha usando bcrypt
      bcrypt.compare(password, user.password)
        .then(result => {
          if (!result) {
            return res.status(401).json({ message: 'Senha inválida' });
          }

          // Crie um token JWT
          const secretKey = '123'; // Substitua com a sua chave secreta
          const token = jwt.sign({ email, result }, secretKey, { expiresIn: '24h' });

          // Retorne as informações do usuário e o token
          const userData = {
            id: user._id,
            name: user.name,
            username: user.username,
            phone: user.phone,
            token: token
          };

          return res.json({ auth: true, ...userData });
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Erro ao verificar a senha' });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Erro ao buscar o usuário' });
    });
});


//*===================== ROTA PROTEGIDA =====================*
routerUser.get('/protected/user/buscar', (req, res) => {
  // Recebe o token do frontend
  const token = req.headers.authorization;

  // Se não houver token, retorna esse código
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  // Substitua com a sua chave secreta
  const secretKey = '123';

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      // Se token for falso
      return res.status(401).json({ message: 'Token inválido' + JSON.stringify(token) });
    }

    // Decodifique o token para obter informações do usuário
    const userEmail = decoded.email;

    // Busque os dados do usuário com base no email
    User.findOne({ email: userEmail })
      .then((user) => {

        // Verifica se usuário é diferente
        if (!user) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Pega e retorna os dados do usuário
        const userData = {
          _id: user._id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          endereco: user.endereco,
        };

        // Envia o userData para o frontend
        res.json({ message: 'Rota protegida acessada com sucesso', userData });
      })
      .catch(err => {
        console.error('Erro ao buscar usuário:', err);
        res.status(500).json({ message: 'Erro interno do servidor' });
      });
  });
});

routerUser.patch('/protected/userstore/editar', (req, res) => {
  // Recebe o token do frontend
  const token = req.headers.authorization;

  // Se não houver token, retorna esse código
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  // Chave secreta
  const secretKey = '123';

  // Verifica o token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      // Se o token for inválido, retorna um erro
      return res.status(401).json({ message: 'Token inválido' });
    }

    // Decodifique o token para obter informações do usuário
    const userEmail = decoded.email;

    // Busque os dados do usuário com base no email
    User.findOneAndUpdate(
      { email: userEmail },
      { $set: req.body }, // Use req.body para obter os dados a serem atualizados
      { new: true } // Retorna o novo objeto atualizado
    )
    .then((user) => {
      // Verifica se o usuário existe
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Retorna os dados atualizados do usuário
      const userData = {
        name: user.name,
        email: user.email,
        username: user.username,
      };

      // Retorna os dados do usuário atualizados para o frontend
      res.json({ message: 'Dados do usuário atualizados com sucesso', userData });
    })
    .catch((error) => {
      console.error('Erro ao atualizar os dados do usuário:', error);
      res.status(500).json({ message: 'Erro ao atualizar os dados do usuário' });
    });
  });
});

//*===================== ROTA PROTEGIDA =====================*

module.exports = routerUser