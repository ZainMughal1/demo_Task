const express = require('express');
const router = express.Router();
const controllers = require('../controllers/controllers')

// Define the route for the home page
router.get('/products', controllers.getProducts);
router.post('/product', controllers.createProduct);
router.get('/products/:id', controllers.getProductById);
router.put('/products/:id', controllers.updateProduct);
router.delete('/products/:id', controllers.deleteProduct);

module.exports = router;
