const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const sendEmail = require('./emailService');
const crypto = require('crypto');
const User = require('../models/UserModel'); // Certifique-se de ajustar o caminho para o modelo de usuário

const routerResetPassword = express();
routerResetPassword.use(express.json());

// Endpoint para solicitar redefinição de senha
routerResetPassword.post('/request-reset-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({message: 'Usuário não encontrado.'});
        }

        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        await user.save();

        const resetUrl = `http://localhost:3001/reset-password/${token}`;
        const emailBody = `
            <h3>Você solicitou a redefinição de senha da sua conta.</h3>
            <p>Clique no link abaixo ou cole no seu navegador para completar o processo:</p>
            <a href="${resetUrl}">Redefinir senha</a>
            <p>Se você não solicitou isso, ignore este email e sua senha permanecerá inalterada.</p>
        `;

        await sendEmail(email, 'Redefinição de Senha', emailBody);

        res.status(200).send({ message: 'Email de redefinição de senha enviado.' });
    } catch (error) {
        return res.status(500).json({ message: `Erro no servidor ao enviar email de redefinição de senha: ${error.message}` });
    }
});

// Endpoint para criar uma senha. 1º acesso do usuário 
routerResetPassword.post('/first-access', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({message: 'Usuário não encontrado.'});
        }

        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        await user.save();

        const resetUrl = `http://192.168.247.103:3000/reset-password/${token}`;
        const emailBody = `
            <h3>Seja bem vindo ao seu primeiro acesso!</h3>
            <p>Clique no link abaixo ou cole no seu navegador para completar o processo:</p>
            <a href="${resetUrl}">Criar senha</a>
            <p>Bem vindo a plataforma de treinos e avaliação física.</p>
        `;

        await sendEmail(email, 'Criação de Senha', emailBody);

        res.status(200).send({ message: 'Email de criação de senha enviado.' });
    } catch (error) {
        return res.status(500).json({ message: `Erro no servidor ao enviar email de criação senha: ${error.message}` });
    }
});

// Endpoint para redefinir senha
routerResetPassword.post('/reset-password/:token', async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({message: 'Token inválido ou expirado.'});
        }

        user.password = password; // Certifique-se de hash a senha antes de salvar
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({message: 'Senha redefinida com sucesso.'});
    } catch (error) {
        return res.status(500).json({ message: `Erro no servidor ao redefinir senha: ${error.message}` });
    }
    
});

module.exports = routerResetPassword