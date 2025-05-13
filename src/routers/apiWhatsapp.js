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
  const entry = req.body.entry?.[0];
  const changes = entry?.changes?.[0];
  const message = changes?.value?.messages?.[0];
  const from = message?.from;

  // Logs para debug
  console.log('Body recebido:', JSON.stringify(req.body, null, 2));

  // 👉 1. Trata mensagens de BOTÃO (button reply)
  if (message?.type === 'interactive' && message.interactive.type === 'button_reply') {
    const payload = message.interactive.button_reply.id;
    let respostaBotao = '';

    if (payload === 'link_nao_abre') {
      respostaBotao = `🔗 Parece que o link não está funcionando. Clique aqui para suporte: \n👉 https://wa.me/5521973561012?text=Link%20com%20problema`;
    } else if (payload === 'erro_geral') {
      respostaBotao = `❌ Para descrever melhor o erro, clique para falar com o suporte: \n👉 https://wa.me/5521973561012?text=Quero%20descrever%20o%20erro`;
    } else if (payload === 'orcamento_docsst') {
      respostaBotao = `📄 Clique aqui para ser encaminhado para o responsável \n👉 https://wa.me/5521973561012?text=Sou%20particular%20ou%20empresa%2C%20e%20quero%20or%C3%A7amento%20de%20treinamento%2C%20ou%20DOC%20SST%3A%20PGR%2FPCMSO%20relat%C3%B3rios.`;
    }

    // Envia a resposta baseada no botão clicado
    if (respostaBotao && from) {
      try {
        await axios.post(
          `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
          {
            messaging_product: 'whatsapp',
            to: from,
            type: 'text',
            text: { body: respostaBotao }
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
      } catch (error) {
        console.error('Erro ao enviar resposta do botão:', error.response?.data || error.message);
      }
    }
    return res.sendStatus(200); // Finaliza aqui o ciclo do botão
  }

  // 👉 2. Trata mensagens de TEXTO
  if (message && message.type === 'text') {
    const text = message.text.body.trim().toLowerCase();

    // Respostas prontas
    const links = ``;
    const senhaProva = `🔐 *Aqui está a senha da prova:*\n\nCest5p`;
    const erroAbrirLink = `⚠️ *Teve erro ao abrir o link do Treinamento?*\n\nClique aqui e fale com o suporte: \n👉 https://wa.me/5521973561012?text=Deu%20erro%20ao%20abrir%20o%20link%20do%20Treinamento`;
    const vimPeloSite = `🌐 *Veio pelo site?* \n\nClique abaixo para falar com o atendente: \n👉 https://wa.me/5521973561012?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20preciso%20de%20ajuda.`;
    const parceiroEducacional = `👨‍🏫 *Precisa tratar um assunto pessoal?*\n\nClique no link abaixo para falar com o responsável:\n👉 https://wa.me/5521973561012?text=Assunto%20pessoal.`;
    const respostaInicial = `👋 *Seja bem-vindo à CestSegTrabalho!*\n\nEscolha uma das opções abaixo para que possamos te ajudar da melhor forma:\n\n
1️⃣ *Digite 1* Para receber o *link do Treinamento*\n
2️⃣ *Digite 2* Para receber a *senha da Prova*\n
3️⃣ *Digite 3* Se está tendo *erro ao abrir o link*\n
4️⃣ *Digite 4* Se você *veio pelo site*\n
5️⃣ *Digite 5* Para *falar com um instrutor ou ADM da Cest*\n
6️⃣ *Digite 6* Se você for *Engenheiro, TST, Supervisor, ADM ou Líder de Equipe* — entre em contato o quanto antes (parceiro educacional)\n`;

    let resposta;

    if (text === '1') {
      resposta = links;
    } else if (text === '2') {
      resposta = senhaProva;
    } else if (text === '3') {
      resposta = erroAbrirLink;
    } else if (text === '4') {
      resposta = vimPeloSite;
    } else if (text === '6') {
      resposta = parceiroEducacional;
    } else {
      resposta = respostaInicial;
    }

    // 👉 Se o usuário digitar "5", envia os botões interativos
    if (text === '5') {
      try {
        await axios.post(
          `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
          {
            messaging_product: 'whatsapp',
            to: from,
            type: 'interactive',
            interactive: {
              type: 'button',
              body: {
                text: 'Escolha uma das opções abaixo para falar com o instrutor:'
              },
              action: {
                buttons: [
                  {
                    type: 'reply',
                    reply: {
                      id: 'link_nao_abre',
                      title: '🔗 Link não abre'
                    }
                  },
                  {
                    type: 'reply',
                    reply: {
                      id: 'erro_geral',
                      title: '❌ Erro'
                    }
                  },
                  {
                    type: 'reply',
                    reply: {
                      id: 'orcamento_docsst',
                      title: '📄 Orçamento/DOCSST'
                    }
                  }
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
        console.error('Erro ao enviar botões:', error.response?.data || error.message);
      }

      return res.sendStatus(200);
    }

    // Envia a resposta de texto normal
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
      console.error('Erro ao responder mensagem:', error.response?.data || error.message);
    }

    return res.sendStatus(200);
  }

  // Se não for tipo tratado, responde 200 mesmo assim
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
