const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
definition: {
openapi: '3.0.0',
info: {
    title: 'Fintech Dashboard API',
    version: '1.0.0',
    description: 'API for managing financial transactions and dashboard',
},
servers: [
    {
    url: 'http://localhost:5000',
    description: 'Development server',
    },
],
components: {
    securitySchemes: {
    bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    },
    },
    schemas: {
    Transaction: {
        type: 'object',
        properties: {
        type: {
            type: 'string',
            enum: ['credit', 'debit'],
        },
        amount: {
            type: 'number',
            minimum: 1,
        },
        description: {
            type: 'string',
        },
        balanceAfter: {
            type: 'number',
        },
        },
        required: ['type', 'amount'],
    },
    User: {
        type: 'object',
        properties: {
        username: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
        role: {
            type: 'string',
            enum: ['user', 'admin'],
        },
        },
        required: ['username', 'password'],
    },
    },
},
security: [
    {
    bearerAuth: [],
    },
],
},
apis: ['./routes/*.js'], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };