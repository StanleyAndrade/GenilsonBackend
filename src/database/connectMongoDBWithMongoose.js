//Connecting MongoDB With Mongoose

//importing mongoose
const mongoose = require('mongoose')

//Connecting MongoDB to Mongoose. Var with a function inside
const connectMongoDBWithMongoose = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cestseg.ri4nmuc.mongodb.net/?retryWrites=true&w=majority&appName=CestSeg"`, {
    }).then(() => {
        console.log('Conectado ao MongoDB')
    }).catch((error) => {
        console.log('Erro ao conectar ao MongoDB ' + error)
    })
    
}

module.exports = connectMongoDBWithMongoose