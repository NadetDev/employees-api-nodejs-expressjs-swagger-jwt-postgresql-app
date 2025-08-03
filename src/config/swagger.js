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
      {
        url: 'http://employee-api.local/api',  // URL Kubernetes
        description: 'Kubernetes cluster'
      },
      {
        url: 'http://localhost:3000/api',     // URL locale
        description: 'Local development'
      }
    ],
  },
  apis: [
    './src/routes/*.js',
    './src/models/*.js'
  ]
};