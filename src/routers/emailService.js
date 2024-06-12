const nodemailer = require('nodemailer');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
dotenv.config();

// Configurar AWS SDK
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Criar o transporter do Nodemailer usando o SES
let transporter = nodemailer.createTransport({
    SES: new AWS.SES({
        apiVersion: '2010-12-01'
    })
});

const sendEmail = async (to, subject, body) => {
    try {
        let info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL, // endereço de email verificado no SES
            to: to,
            subject: subject,
            html: body
        });
        console.log('Email sent: ', info);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};

module.exports = sendEmail;
