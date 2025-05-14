// src/utils/sendWhatsappMessage.js
const axios = require('axios');

async function sendWhatsappMessage({ to, message, token, phoneNumberId }) {
  try {
    const url = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;

    const response = await axios.post(
      url,
      {
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: message }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ Mensagem enviada com status:', response.status);
    return response.data;
  } catch (err) {
    console.error('❌ Erro ao enviar mensagem:', err.response?.data || err.message);
  }
}

module.exports = sendWhatsappMessage;
