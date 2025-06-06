const router = require("express").Router();

router.use('/api-docs', require("./swagger"));   // Swagger docs en /api-docs
router.use('/api/products', require("./productRoutes"));  // Productos en /api/products

module.exports = router;
