// const {Pedido: pedidoModel} = require("../models/pedidoModel")

// const pedidoController = {
//     create: async (req, res) => {
//         try {
//             const product = {
//                 name: req.body.name,
//                 description: req.body.description,
//                 price: req.body.price,
//                 image: req.body.image,
//             }
//             const response = await pedidoModel.create(product)
//             res.status(200).json({response, msg: "Pedido Criado com sucesso"})
//         } catch (error) {
//             console.log('Deu erro ' + error)
//         }
//     }
// }

// module.exports = pedidoController