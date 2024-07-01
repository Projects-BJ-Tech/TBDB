// Importar módulos com sintaxe ES Modules
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from "url";
import path from "path";

import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar o Express
const app = express();

const router = express.Router();

// Configurações do Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// This is to read csss
const __dirname = path.dirname(fileURLToPath(import.meta.url));

router.get("/", (req, res) => {
    res.render(path.join(__dirname, "views", "pages", "index"));
});


// Aviso de depreciação do Mongoose: `strictQuery`
mongoose.set('strictQuery', false);

// Conexão com o MongoDB
const mongoURI = process.env.CONNECTION_STRING;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('🚀  Connection  ' + process.env.DB_NAME + ' successfully!'))
.catch(err => console.log('💥  Connection  ' + process.env.DB_NAME + ' unsuccessfully!', err.message))


// Configuração do Swagger (exemplo)
const swaggerOptions = {
    definition: { 
        openapi: '3.0.0',
        defaultExpanded: true,
        "info": {
          "version": "1.0.0",
          "title": "TBDB - The Biomimicry Database API",
          "description": "The Biomimicry Database API documentation.\n\nExplore the power of biomimicry with TBDB, a comprehensive platform that centralizes and provides access to a wealth of information on nature-inspired solutions. This API serves as the backbone, offering seamless access to a diverse range of biomimetic data, fostering innovation and sustainable practices across various fields.\n\nDiscover the wonders of nature and leverage this API to integrate biomimicry seamlessly into your projects.",
          "contact": {
              "name": "Equipe TBDB",
              "email": "vagneripg@gmail.com"
          },
          "license": {
              "name": "Licença TBDB",
              "url": "https://github.com/VagnerBomJesus/TheBiomimicryDatabase"
          },
          "termsOfService": "https://github.com/VagnerBomJesus/TheBiomimicryDatabase"
      },
        servers: [
            {
                url: 'https://thebiomimicrydb.vercel.app/', // Exemplo para Vercel
                description: 'Vercel Deployed API Documentation',
            },
            {
                url: 'https://thebiomimicrydb.pt/', // Domínio personalizado .pt
                description: 'The Biomimicry DB API Documentation',
            },
            {
                url: 'http://localhost:3000/', // Servidor local
                description: 'Local API Documentation',
            },

        ],
    },
    apis: ['src/**/*.js'], // Especifique o caminho para os arquivos de rota da API
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);
const CSS_URL = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css';
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs, { customCssUrl: CSS_URL }));



app.use("/", (req, res) => {
    res.send('Hello World!');
});
// Exportar o aplicativo Express configurado
export default app;
