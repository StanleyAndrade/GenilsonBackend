//Connecting MongoDB With Mongoose

//importing mongoose
const mongoose = require('mongoose')

//Connecting MongoDB to Mongoose. Var with a function inside
const connectMongoDBWithMongoose = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@gym.pdslmkj.mongodb.net/?retryWrites=true&w=majority`, {
    }).then(() => {
        console.log('Conectado ao MongoDB')
    }).catch((error) => {
        console.log('Erro ao conectar ao MongoDB ' + error)
    })
    
}

module.exports = connectMongoDBWithMongoose