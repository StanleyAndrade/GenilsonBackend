// aws-parameter-store.js
const AWS = require('aws-sdk');
AWS.config.update({ region: 'sa-east-1' }); // Substitua pela sua região

const ssm = new AWS.SSM();

async function getAWSSecrets(parameterName) {
    try {
        const params = {
            Name: parameterName,
            WithDecryption: true
        };

        const data = await ssm.getParameter(params).promise();
        return data.Parameter.Value;
    } catch (err) {
        console.error('Erro ao obter parâmetros do Parameter Store:', err);
        throw err;
    }
}

module.exports = { getAWSSecrets };
