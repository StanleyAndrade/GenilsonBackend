const jwt = require('jsonwebtoken');
const secretKey = '123'; // Chave secreta para assinar e verificar o token

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    
    // Se o token for válido, armazena as informações decodificadas do usuário no req.user
    req.user = decoded;
    next(); // Chama o próximo middleware ou rota handler
  });
};

module.exports = authenticateToken;
