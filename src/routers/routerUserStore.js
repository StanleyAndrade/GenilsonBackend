//importing Express
const express = require('express')
const routerUserStore = express()

//importing cors
const cors = require('cors')
routerUserStore.use(cors())

//importing bcrypt
const bcrypt = require('bcrypt')

//importing JWT
const jwt = require('jsonwebtoken')

//importing BodyParser
const bodyParser = require('body-parser')

//importing Model
const UserStore = require('../models/UserStoreModel')

//signaling that it will be receive JSON
routerUserStore.use(bodyParser.json())

// Importing cookie-parser
const cookieParser = require("cookie-parser") 
routerUserStore.use(cookieParser())

// * ==================== GET - Pega todos os usuários ==================== *
routerUserStore.get('/userstore/buscar', async (req, res) => {
    const all = await UserStore.find()

    try {
      return res.status(200).json(all)
    } catch (error) {
      return res.status(500).send('Deu erro' + error.message)
    }
})


// * ==================== GET - Por ID ==================== *
//Ex.: http://localhost:3000/user/65a837b2111f4fb66d63c4be
routerUserStore.get('/userstore/buscar/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserStore.findById(userId)

    if (!user) {
      return res.status(404).json({message: 'Usuário não encontrado'});
    }

    return res.status(200).json(user)
  } catch (error) {
      return res.status(500).send('Deu erro' + error.message)
  }
})

// Rota para buscar o perfil do usuário pelo nome de usuário e exibir na url
routerUserStore.get('/:username', async (req, res) => {
  try {
      const username = req.params.username;
      const user = await UserStore.findOne({ username });

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

//*===================== CADASTRAR USUÁRIO =====================*
routerUserStore.post('/userstore/criar', (req, res) => {
    const { name, endereco, phone, email, horarioDeFuncionamento, time, payment, nameperson, password, username, imageUrl, imageKey} = req.body;

    // Verifique se o usuário já existe
    UserStore.findOne({ email })
        .then((existingUser) => {
            if (existingUser) {
                return res.status(400).json({ message: 'Usuário já existe' });
            }

            // Criptografe a senha do usuário
            bcrypt.hash(password, 10)
                .then((hashedPassword) => {

                    // Crie o novo usuário
                    const newUser = new UserStore({
                        name,
                        endereco,
                        phone,
                        email,
                        horarioDeFuncionamento,
                        time,
                        payment,
                        nameperson,
                        password: hashedPassword,
                        username,
                        imageUrl,
                        imageKey,
                    });

                    // Salve o usuário no banco de dados
                    newUser.save()
                        .then((savedUser) => {
                          res.status(201).json({ message: 'Usuário registrado com sucesso' });
                        })
                        .catch((error) => {
                            console.error('Erro ao criar usuário:', error);
                            res.status(500).json({ message: 'Erro ao criar usuário' });
                        });
                })
                .catch((error) => {
                    console.error('Erro ao criar usuário:', error);
                    res.status(500).json({ message: 'Erro ao criar usuário' });
                });
        })
        .catch((error) => {
            console.error('Erro ao verificar usuário existente:', error);
            res.status(500).json({ message: 'Erro ao verificar usuário existente:' });
        });
});
//*===================== CADASTRAR USUÁRIO =====================*



//*===================== lOGIN =====================*
routerUserStore.post('/userstore/login', (req, res) => {
  const { email, password } = req.body;

  // Encontre o usuário pelo email
  UserStore.findOne({ email }) 
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
          const token = jwt.sign({ email, result }, secretKey, {expiresIn: '24h'});
          return res.json({ auth: true, token });
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
//*===================== lOGIN =====================*


//*===================== GET - ROTA PROTEGIDA =====================*
routerUserStore.get('/protected/userstore/buscar', (req, res) => {
  //recebe o token do frontend
  const token = req.headers.authorization;

  //Se não houver token, retorna esse código
  if (!token) {
    return res.status(401).json({ message: 'Token não foi fornecido' });
  }

  // Chave secreta
  const secretKey = '123';

  // Verifica o token
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      //se token for falso retorna um erro
      return res.status(401).json({ message: 'Token inválido' + JSON.stringify(token) });
    }

    //Decodifique o token para obter informações do usuário
    const userEmail = decoded.email;

    // Busque os dados do usuário com base no email
    UserStore.findOne({ email: userEmail})
    .then((user) => {

      // Verifica se usuário é diferente
      if(!user) {
        return res.status(404).json({messege: 'Usuário não encontrado'})
      }

      //Pega e retorna os dados do usuário
      const userData = {
        _id: user._id,
        name: user.name,
        endereco: user.endereco,
        phone: user.phone,
        email: user.email,
        horarioDeFuncionamento: user.horarioDeFuncionamento,
        time: user.time,
        payment: user.payment,
        nameperson: user.nameperson,
        username: user.username,
        imageUrl: user.imageUrl,
        imageKey: user.imageKey,
      }

      //envia o userData para o frontend
      res.json({ message: 'Rota protegida acessada com sucesso', userData });
    })
    .catch(() => {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ message: 'Erro ao buscar usuário' });
    })
  })
});
//*===================== GET - ROTA PROTEGIDA =====================*

routerUserStore.patch('/protected/userstore/editar', (req, res) => {
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
    UserStore.findOneAndUpdate(
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
        endereco: user.endereco,
        phone: user.phone,
        email: user.email,
        horarioDeFuncionamento: user.horarioDeFuncionamento,
        time: user.time,
        payment: user.payment,
        nameperson: user.nameperson,
        username: user.username,
        imageUrl: user.imageUrl,
        imageKey: user.imageKey,
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

module.exports = routerUserStore