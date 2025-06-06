const Product = require('../models/productModel');  

// Crear un producto
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);  // Crear el nuevo producto
    await newProduct.save();  // Guardarlo en la base de datos
    res.status(201).json(newProduct);  // Responder con el producto creado
  } catch (error) {
    res.status(400).json({ message: 'Error al crear producto', error: error.message });
  }
};

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();  // Obtener todos los productos
    res.status(200).json(products);  // Responder con los productos
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos', error: error.message });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);  // Buscar el producto por su ID
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);  // Responder con el producto encontrado
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto', error: error.message });
  }
};

// Actualizar un producto por ID
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });  // Actualizar el producto
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(updatedProduct);  // Responder con el producto actualizado
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar producto', error: error.message });
  }
};

// Eliminar un producto por ID
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);  // Eliminar el producto
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado' });  // Responder con el mensaje de eliminación
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
    updateProduct,
  deleteProduct
};