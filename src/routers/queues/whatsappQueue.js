const Queue = require('bull');
const axios = require('axios');
const sendWhatsappMessage = require('../../utils/sendWhatsappMessage');

const redisOptions = {
  redis: {
    host: '127.0.0.1', // ou endereço do Redis no seu ambiente
    port: 6379
  }
};

// Cria fila
const whatsappQueue = new Queue('whatsapp-messages', redisOptions);

// Processador da fila
whatsappQueue.process('enviarP1', async (job) => {
  const { to, message, token, phoneNumberId } = job.data;
  await sendWhatsappMessage({ to, message, token, phoneNumberId });

  try {
    await axios.post(
      `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: to,
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
    console.log(`✅ Mensagem enviada com delay para ${to}`);
  } catch (error) {
    console.error('Erro no envio agendado:', error.response?.data || error.message);
  }
});

module.exports = whatsappQueue;
