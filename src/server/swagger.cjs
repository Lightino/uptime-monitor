const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const serverProd = {
    url: 'https://aggregatore.38.242.152.39.sslip.io/api',
    description: 'Server di produzione',
};

const serverDev = {
    url: 'http://localhost:3000/api',
    description: 'Server di sviluppo',
};

let components = {};
const security = [];

if (process.env.NODE_ENV === 'production') {
    components = {
        securitySchemes: {},
    };
    components.securitySchemes.BearerAuth = {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter your signed bearer token',
    };

    security.push({ BearerAuth: [] });
}

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'Endpoints API',
          version: '1.0.0',
          description: 'API',
        },
        servers: [
            process.env.NODE_ENV === 'development' ? serverDev : serverProd,
        ],
        components: components,
        security: security,
    },
    apis: [path.resolve(__dirname, './api/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;