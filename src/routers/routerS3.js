const express = require('express');
const routerS3 = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Pasta onde os arquivos serão temporariamente armazenados
routerS3.use(bodyParser.urlencoded({ extended: true }));
routerS3.use(bodyParser.json());
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configure AWS SDK with your credentials
AWS.config.update({
  accessKeyId: 'AKIAR4RVBCLLGNUNEFPJ',
  secretAccessKey: 'jthmxcpO72rdLw9SS+oyknUwduyu/Ccyqv5paH7s'
});

// Create S3 instance
const s3 = new AWS.S3();

// Rota para upload de imagens
routerS3.post('/upload', upload.single('file'), async (req, res) => {
    try {
      // Determina o tipo de conteúdo do arquivo
      const fileBuffer = fs.readFileSync(req.file.path);
      const fileInfo = {
        mime: 'image/jpeg' // Defina o tipo de conteúdo para imagem/jpeg como padrão
      };
  
      // Verifica a extensão do arquivo para definir o tipo de conteúdo corretamente
      const ext = path.extname(req.file.originalname).toLowerCase();
      if (ext === '.png') {
        fileInfo.mime = 'image/png';
      } else if (ext === '.gif') {
        fileInfo.mime = 'image/gif';
      } else if (ext === '.gif') {
        fileInfo.mime = 'image/jpg';
      }
  
      // Parâmetros para upload
      const params = {
        Bucket: 'sistema-delivery1995',
        Key: req.file.originalname, // Nome que a imagem terá no S3
        Body: fileBuffer,
        ContentType: fileInfo.mime, // Define o tipo de conteúdo com base na extensão do arquivo
        ACL: 'public-read', // Configura a ACL para permitir acesso público de leitura
      };
  
      const data = await s3.upload(params).promise();
      console.log("Arquivo enviado com sucesso", data.Location);
      //res.send(data.Location); // Retorna a URL do arquivo no S3
      res.json({ imageUrl: data.Location, imageKey: params.Key });

    } catch (error) {
      console.error("Erro ao enviar para o S3", error);
      res.status(500).send("Erro ao fazer upload");
    }
});

// Rota para deletar uma foto do Amazon S3
routerS3.delete('/delete/:key', async (req, res) => {
    const key = req.params.key;

    try {
        const params = {
            Bucket: 'sistema-delivery1995',
            Key: key // Chave do objeto a ser deletado
        };

        // Chama a função deleteObject para deletar o objeto do Amazon S3
        await s3.deleteObject(params).promise();

        console.log("Arquivo deletado com sucesso:", key);
        res.send("Arquivo deletado com sucesso");
    } catch (error) {
        console.error("Erro ao deletar arquivo do S3:", error);
        res.status(500).send("Erro ao deletar arquivo do S3");
    }
});

  

module.exports = routerS3