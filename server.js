require ('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const connectDatabase = require('./database/connection');
const productRoutes = require('./routes/productRoutes');
const swaggerRoutes = require('./routes/swagger'); // Asegúrate de que la ruta sea correcta


const app = express();
const PORT = process.env.PORT || 3000;

connectDatabase();

app.use(cors({
  origin: '*',  // Permitir cualquier origen (solo para desarrollo)
}));


app.use(express.json());
app.use('/', require('./routes/index'));


//swagger documentation ROUTE 
app.use('/api-docs', swaggerRoutes); // Ruta para la documentación Swagger
//routes
app.use('/api/products', productRoutes);
// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Documentación Swagger en http://localhost:${PORT}/api-docs`);
});