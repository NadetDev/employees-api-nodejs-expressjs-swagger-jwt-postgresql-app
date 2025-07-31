module.exports = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee API',
      version: '1.0.0',
      license: {
        name: 'MIT'
      }
    },
    servers: [
      { url: 'http://localhost:3000/api/v1' }
    ]
  },
  apis: [
    './src/routes/*.js',
    './src/models/*.js'
  ]
};