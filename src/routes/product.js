const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');

router.post('/create', productController.create);
router.get('/:id/edit', productController.one);
router.delete('/:id/delete', productController.delete);
router.post('/:id/edit', productController.update);
router.get('/', productController.index);

module.exports = router;