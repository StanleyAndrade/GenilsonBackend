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

    if (message && message.type === 'button') {
    const from = message.from;
    const payload = message.button.payload;

    let respostas = '';

    if (payload === 'link_nao_abre') {
      respostas = `🔗 Parece que o link não está funcionando. Clique aqui para suporte: https://wa.me/5521973561012?text=Link%20com%20problema`;
    } else if (payload === 'erro_geral') {
      respostas = `❌ Descreva melhor o erro para que possamos te ajudar.`;
    } else if (payload === 'orcamento_docsst') {
      respostas = `📄 Encaminharemos seu pedido de orçamento/DOCSST para o setor responsável.`;
    }

    // Mensagens prontas
    const links = ``;
    const senhaProva = `🔐 *Aqui está a senha da prova:*\n\nCest5p`;
    const erroAbrirLink = `⚠️ *Teve erro ao abrir o link do Treinamento?*\n\nClique aqui e fale com o suporte: \n👉 https://wa.me/5521973561012?text=Deu%20erro%20ao%20abrir%20o%20link%20do%20Treinamento`;
    const vimPeloSite = `🌐 *Veio pelo site?* \n\nClique abaixo para falar com o atendente: \n👉 https://wa.me/5521973561012?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20preciso%20de%20ajuda.`;
    // const falarComInstrutor = ``; // quero que exiba 3 botões: 'Link não abre', 'Erro', Orçamento/DOCSST/PGR
    const parceiroEducacional = `Precisa falar um assunto pessoal? Clique aqui para ser redirecionado para o responsável:\n https://wa.me/5521973561012?text=Ol%C3%A1%2C%20vim%20pelo%20site%20e%20preciso%20de%20ajuda.`;
    const respostaInicial = `👋 *Seja bem-vindo à CestSegTrabalho!*\n\nEscolha uma das opções abaixo para que possamos te ajudar da melhor forma:\n\n
    1️⃣ *Digite 1* Para receber o *link do Treinamento*\n
    2️⃣ *Digite 2* Para receber a *senha da Prova*\n
    3️⃣ *Digite 3* Se está tendo *erro ao abrir o link*\n
    4️⃣ *Digite 4* Se você *veio pelo site*\n
    5️⃣ *Digite 5* Para *falar com um instrutor ou ADM da Cest*\n
    6️⃣ *Digite 6* Se você for *Engenheiro, TST, Supervisor, ADM ou Líder de Equipe* — entre em contato o quanto antes (parceiro educacional)\n
    `;
    const respostaTreinamento = `📚 Você escolheu *Treinamento*. Em breve enviaremos os conteúdos.`;
    const respostaProva = `📝 Você escolheu *Prova*. Vamos agendar sua prova.`;

    // Variável que será enviada como resposta
    let resposta;

    // Define a resposta com base no texto recebido
    if (text === '1') {
      resposta = links;
    } else if (text === '2') {
      resposta = senhaProva;
    } else if (text === '3') {
      resposta = erroAbrirLink;
    } else if (text === '4') {
      resposta = vimPeloSite;
    }  else if (text === '6') {
      resposta = parceiroEducacional;
    } else {
      // Se a mensagem for qualquer outro texto (inclusive na primeira vez), envia o menu inicial
      resposta = respostaInicial;
    }

    // Se o usuário digitar "falar", envia 3 botões
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

      return res.sendStatus(200); // Finaliza o ciclo aqui após enviar os botões
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
