const express = require('express');
// Importamos funciones de validación de express-validator
const { body, validationResult, param } = require('express-validator');

const router = express.Router();

// Importamos las funciones del controlador para manejar la lógica de cada ruta
const { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');

// Middleware para validar los errores que hayan surgido con express-validator
// Esta función revisa si hay errores en la validación y devuelve un error 400 si los hay
const validate = (req, res, next) => {
  const errors = validationResult(req); // Obtiene los errores que detectó express-validator
  if (!errors.isEmpty()) {               // Si hay errores
    return res.status(400).json({ errors: errors.array() }); // Devuelve error 400 con detalles
  }
  next();  // Si no hay errores, sigue con el siguiente middleware o función
};

// Ruta para obtener todos los productos
// No necesita validación porque no recibe datos
router.get('/', getProducts);

// Ruta para obtener un producto por su ID
// Validamos que el parámetro 'id' sea un ObjectId válido de MongoDB
router.get('/:id', 
  param('id').isMongoId().withMessage('ID inválido'), // Valida el ID
  validate,  // Llama a nuestro middleware para validar errores
  getProductById  // Función que obtiene el producto
);

// Ruta para crear un nuevo producto
// Validamos que el body tenga 'name' y 'price' y que cumplan ciertas reglas
router.post('/',
  body('name').notEmpty().withMessage('El nombre es obligatorio'), // Nombre requerido
  body('price').isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor que 0'), // Precio > 0
  body('description').optional().isString(), // Descripción opcional pero si está debe ser string
  validate, // Validamos los errores
  createProduct  // Función que crea el producto
);

// Ruta para actualizar un producto por ID
// Validamos que el ID sea válido y que los campos recibidos cumplan reglas (son opcionales)
router.put('/:id',
  param('id').isMongoId().withMessage('ID inválido'), // Validar ID
  body('name').optional().notEmpty().withMessage('El nombre no puede estar vacío'), // Si envían nombre, que no esté vacío
  body('price').optional().isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor que 0'), // Precio opcional y válido
  body('description').optional().isString(), // Descripción opcional
  validate, // Validar errores
  updateProduct // Función que actualiza el producto
);

// Ruta para eliminar un producto por ID
// Solo validamos que el ID sea válido
router.delete('/:id',
  param('id').isMongoId().withMessage('ID inválido'), // Validar ID
  validate,  // Validar errores
  deleteProduct  // Función que elimina el producto
);

module.exports = router;  // Exportamos el router para usarlo en app.js o server.js
