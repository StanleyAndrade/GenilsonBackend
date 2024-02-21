const AWS = require('aws-sdk');
const fs = require('fs');

// Configure AWS SDK with your credentials
AWS.config.update({
  accessKeyId: 'AKIAR4RVBCLLGNUNEFPJ',
  secretAccessKey: 'jthmxcpO72rdLw9SS+oyknUwduyu/Ccyqv5paH7s'
});

// Create S3 instance
const s3 = new AWS.S3();

// Define função para fazer upload de uma imagem para o Amazon S3
async function uploadImageToS3(imagePath, bucketName, keyName) {
  // Ler o arquivo da imagem
  const fileContent = fs.readFileSync(imagePath);

  // Parâmetros para upload
  const params = {
    Bucket: bucketName,
    Key: keyName,
    Body: fileContent,
  };
  //ContentType: 'image/jpeg' // Altere o tipo de conteúdo conforme necessário

  try {
    const data = await s3.upload(params).promise()
    console.log("Arquivo enviado com sucesso", data.Location)
    return data.Location
  } catch (error) {
    console.error("Erro ao enviar pra s3", error)
    throw error
  }
}

// Exemplo de uso
const imagePath = 'path/to/your/image.jpg'; // Caminho para a imagem no seu servidor
const bucketName = 'sistema-delivery1995';
const keyName = 'nome-da-imagem-no-s3.jpg'; // Nome que a imagem terá no S3

// Chamada da função para fazer upload da imagem
uploadImageToS3(imagePath, bucketName, keyName);
