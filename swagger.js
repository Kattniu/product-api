const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Product API', // Cambié el título de "Contacts API" a "Product API"
    description: 'API for managing products', // Descripción de la API
  },
  host: 'localhost:3000',  // Cambié el puerto a 3000 para que coincida con tu configuración
  schemes: ['http', 'https'],
};

const outputFile = './swagger.json'; // Aquí se genera el archivo swagger.json
const endpointsFiles = ['./routes/index.js',  './routes/productRoutes.js']; // Rutas que Swagger analizará para generar la documentación

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./server.js');
});