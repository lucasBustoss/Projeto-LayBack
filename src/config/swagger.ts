const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Projeto Layback',
      version: '1.0.0',
      description: 'Documentação da API Projeto Layback com Swagger',
    },
  },
  apis: ['./src/routes/*.ts'], // Onde seus arquivos de rotas estão localizados
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };