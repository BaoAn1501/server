const express = require('express');
const router = express.Router();
const categoryController = require('../app/application/CategoryController');
const productController = require('../app/application/ProductController');

router.get('/categories/:id', categoryController.one);
router.get('/categories', categoryController.index);
router.get('/products/:id/:slug', productController.oneSlug);
router.get('/products/:id', productController.one);
router.get('/products', productController.index);

module.exports = router;