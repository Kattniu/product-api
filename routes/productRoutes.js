const express = require('express');
const router = express.Router();

// Desestructuramos las funciones que vamos a usar
const { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');  // Asegúrate de que la ruta sea correcta

// Rutas específicas para productos

// Obtener todos los productos
router.get('/', getProducts);  // Aquí usamos directamente la función desestructurada

// Obtener producto por ID
router.get('/:id', getProductById);  // Aquí también usamos la función desestructurada

// Crear un nuevo producto
router.post('/', createProduct);  // Aquí también usamos la función desestructurada

// Actualizar producto por ID
router.put('/:id', updateProduct);  // Aquí también usamos la función desestructurada

// Eliminar producto por ID
router.delete('/:id', deleteProduct);  // Aquí también usamos la función desestructurada

module.exports = router;
