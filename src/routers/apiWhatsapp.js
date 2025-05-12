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

// ✅ Receber mensagens e responder a gatilhos
router.post('/whatsapp/webhook', async (req, res) => {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];
    
    console.log('Body recebido:', JSON.stringify(req.body, null, 2));

    if (message && message.type === 'text') {
      const from = message.from; // número do cliente (ex: 5521992002356)
      const text = message.text.body.trim().toLowerCase(); // mensagem do cliente
  
      const resposta = ``;
  
      // if (text === 'oi' || text === 'oi.') {
      //   resposta = 'Olá! Tudo bem?';
      // } else if (text === 'olá') {
      //   resposta = 'Ola! Seja bem-vindo.';
      // }

        console.log('Mensagem recebida:', message?.text?.body);
        console.log('De:', message?.from);
        console.log('Texto tratado:', text);
        console.log('Resposta definida:', resposta);

                try {
          await axios.post(
            `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
            {
                messaging_product: "whatsapp",
                recipient_type: "individual",
                to: from,
                type: "interactive",
                interactive: {
                  type: "button",
                  body: {
                    text: `*CESTSEGTRABALHO*\nSeja bem vindo aluno(a). Escolha abaixo uma opção:`
                  },
                  action: {
                    buttons: [
                      {
                        type: "reply",
                        reply: {
                          id: "UNIQUE_BUTTON_ID_1",
                          title: "RECEBER LINK"
                        }
                      },
                      {
                        type: "reply",
                        reply: {
                          id: "UNIQUE_BUTTON_ID_2",
                          title: "SENHA DA PROVA"
                        }
                      },
                                            {
                        type: "reply",
                        reply: {
                          id: "UNIQUE_BUTTON_ID_2",
                          title: "NÃO CONSIGO ABRIR LINK: ERRO"
                        }
                      },
                      //                       {
                      //   type: "reply",
                      //   reply: {
                      //     id: "UNIQUE_BUTTON_ID_2",
                      //     title: "VIM PELO SITE (PARTICULAR OU EMPRESA)"
                      //   }
                      // },
                      //                       {
                      //   type: "reply",
                      //   reply: {
                      //     id: "UNIQUE_BUTTON_ID_2",
                      //     title: "FALAR COM INSTRUTOR OU ADM CEST"
                      //   }
                      // },
                      //                       {
                      //   type: "reply",
                      //   reply: {
                      //     id: "UNIQUE_BUTTON_ID_2",
                      //     title: "CLIQUE SE FOR: Engenheiro, TST, Supervisor, ADM, Líder de Equipe"
                      //   }
                      // },
                    ]
                  }
                }
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
        } catch (error) {
          console.error('Erro ao responder mensagem:', error.response?.data || error.message);
        }
    }
  
    res.sendStatus(200); // WhatsApp exige resposta 200 OK
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
