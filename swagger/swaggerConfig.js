import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BeeTrail API',
      version: '1.0.0',
      description: 'BeeTrail Field Logger Backend APIs'
    },
    servers: [{ url: 'http://localhost:5001' }]
  },
  apis: ['./routes/*.js'] // or any valid path for your API annotations
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;