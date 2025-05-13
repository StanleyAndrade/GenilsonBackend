const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// ✅ Token da Meta (RECOMENDADO usar .env)
const token = process.env.TOKEN_META; // substitua pelo seu token de acesso
const phoneNumberId = '613259461877890'; // ID do número de telefone da Meta
const verifyToken = 'CestApiWhatsapp'

router.get('/whatsapp/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const challenge = req.query['hub.challenge'];
    const token = req.query['hub.verify_token']

    if (mode && token === verifyToken) {
        return res.status(200).send(challenge)
    } else {
        return res.sendStatus(403)
    }
});

// ✅ Rota POST para receber mensagens do WhatsApp e responder automaticamente
router.post('/whatsapp/webhook', async (req, res) => {
  // Extrai os dados principais da estrutura do body enviado pelo Webhook do WhatsApp
  const entry = req.body.entry?.[0];
  const changes = entry?.changes?.[0];
  const message = changes?.value?.messages?.[0];

  // Apenas para depuração: imprime no console o corpo completo da requisição
  console.log('Body recebido:', JSON.stringify(req.body, null, 2));

  // Verifica se a mensagem existe e é do tipo texto
  if (message && message.type === 'text') {
    const from = message.from; // Número do usuário que enviou a mensagem
    const text = message.text.body.trim().toLowerCase(); // Texto da mensagem (tratado em minúsculo e sem espaços)

    // Mensagens prontas
    const respostaInicial = `👋 Seja bem-vindo à CestSegTrabalho! Por favor, escolha uma das opções abaixo:\n\n1️⃣ Treinamento\n2️⃣ Provas`;
    const respostaTreinamento = `📚 Você escolheu *Treinamento*. Em breve enviaremos os conteúdos.`;
    const respostaProva = `📝 Você escolheu *Prova*. Vamos agendar sua prova.`;

    // Variável que será enviada como resposta
    let resposta;

    // Define a resposta com base no texto recebido
    if (text === '1') {
      resposta = respostaTreinamento;
    } else if (text === '2') {
      resposta = respostaProva;
    } else {
      // Se a mensagem for qualquer outro texto (inclusive na primeira vez), envia o menu inicial
      resposta = respostaInicial;
    }

    // Logs úteis para depuração
    console.log('Mensagem recebida:', message.text.body);
    console.log('De:', from);
    console.log('Texto tratado:', text);
    console.log('Resposta definida:', resposta);

    // Envia a mensagem de resposta usando a API do WhatsApp Business
    try {
      await axios.post(
        `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: from,
          type: 'text',
          text: { body: resposta }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      // Exibe erro em caso de falha ao enviar a resposta
      console.error('Erro ao responder mensagem:', error.response?.data || error.message);
    }
  }

  // Sempre responde 200 OK para o WhatsApp saber que a requisição foi recebida com sucesso
  res.sendStatus(200);
});

// // 🔹 Enviar mensagem de texto simples via WhatsApp
// router.post('/enviar-mensagem', async (req, res) => {
//   const { to, message } = req.body;

//   try {
//     const response = await axios.post(
//       `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
//       {
//         messaging_product: 'whatsapp',
//         recipient_type: 'individual',
//         to: to,
//         type: 'text',
//         text: {
//           preview_url: false,
//           body: message
//         }
//       },
//       {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       }
//     );
//     res.status(200).json({success: true, response: response.data});
//   } catch (error) {
//     console.error('Erro ao enviar mensagem:', error.response?.data || error.message);
//     res.status(500).json({success: false, error: error.response?.data || error.message});
//   }
// });

// router.post('/enviar-botoes', async (req, res) => {
//     const { to } = req.body;

//     try {
//         const response = await axios.post(
//             `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
//             {
//                 messaging_product: "whatsapp",
//                 recipient_type: "individual",
//                 to: to,
//                 type: "interactive",
//                 interactive: {
//                   type: "button",
//                   body: {
//                     text: "BUTTON_TEXT"
//                   },
//                   action: {
//                     buttons: [
//                       {
//                         type: "reply",
//                         reply: {
//                           id: "UNIQUE_BUTTON_ID_1",
//                           title: "BUTTON_TITLE_1"
//                         }
//                       },
//                       {
//                         type: "reply",
//                         reply: {
//                           id: "UNIQUE_BUTTON_ID_2",
//                           title: "BUTTON_TITLE_2"
//                         }
//                       }
//                     ]
//                   }
//                 }
//             },
//             {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             }
//         )
//         res.status(200).json({sucess: true, response: response.data})
//     } catch (error) {
//         console.error('Erro: ', error.response?.data || error.message);
//         res.status(500).json({success: false, error: error.response?.data || error.message})
//     }

// })

module.exports = router;
