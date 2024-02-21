const AWS = require('aws-sdk');
// Set the Region
AWS.config.update({region: 'us-west-2'})

const fs = require('fs');

// Configuração das credenciais da AWS
const s3 = new AWS.S3({
  apiVersion: '2006-03-01'
  // accessKeyId: 'AKIAR4RVBCLLGNUNEFPJ',
  // secretAccessKey: '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',
});

s3.listBuckets((err, data) => {
  if (err) {
    console.log("Deu erro no buckets", err)
  } else {
    console.log("Sucesso no buckets", data.Buckets)
  }
})



// Função para fazer upload de uma imagem para o Amazon S3
// async function uploadImageToS3(bucketName, imagePath, imageName) {
//   try {
//     // Ler o arquivo de imagem
//     const fileContent = fs.readFileSync(imagePath);

//     // Definir os parâmetros para o upload
//     const params = {
//       Bucket: bucketName,
//       Key: imageName, // Nome do arquivo no S3
//       Body: fileContent,
//     };

//     // Fazer o upload da imagem para o S3
//     const data = await s3.upload(params).promise();
//     console.log('Imagem enviada com sucesso para o S3:', data.Location);
//     return data.Location; // Retorna a URL da imagem no S3
//   } catch (error) {
//     console.error('Erro ao enviar imagem para o S3:', error);
//     throw error;
//   }
// }

// // Exemplo de uso da função de upload
// const bucketName = 'SEU_BUCKET_NAME';
// const imagePath = 'caminho/para/sua/imagem.jpg'; // Caminho para a imagem no seu sistema de arquivos
// const imageName = 'nome_da_imagem.jpg'; // Nome que a imagem terá no S3

// uploadImageToS3(bucketName, imagePath, imageName)
//   .then((imageUrl) => {
//     console.log('URL da imagem no S3:', imageUrl);
//   })
//   .catch((error) => {
//     console.error('Erro ao fazer upload da imagem:', error);
//   });
