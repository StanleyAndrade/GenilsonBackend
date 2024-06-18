// connectMongoDBWithMongoose.js

// Importando mongoose
const mongoose = require('mongoose');

// Importando a função de recuperação de parâmetros do AWS Parameter Store
const { getAWSSecrets } = require('../routers/aws-parameter-store');

// Função para conectar ao MongoDB com os parâmetros do Parameter Store
const connectMongoDBWithMongoose = async () => {
    try {
        const mongoUsername = await getAWSSecrets('/MONGODB_USERNAME');
        const mongoPassword = await getAWSSecrets('/MONGODB_PASSWORD');
        const mongoURI = `mongodb+srv://${mongoUsername}:${mongoPassword}@gym.pdslmkj.mongodb.net/?retryWrites=true&w=majority`;

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Conectado ao MongoDB');
    } catch (error) {
        console.log('Erro ao conectar ao MongoDB ' + error);
    }
};

module.exports = connectMongoDBWithMongoose;
