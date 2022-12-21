const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const productSizeController = require('../app/controllers/ProductSizeController');
const upload = require('../middleware/upload');
const authentication = require('../middleware/authentication');
// products/
router.post('/create', [upload.array('files', 10), authentication.checkLogin], productController.insert);
router.get('/:id/edit/category', [authentication.checkLogin], productController.getCategory);
router.get('/:id/edit', [authentication.checkLogin], productController.one);
router.get('/:id/get-images', [authentication.checkLogin], productController.getImages);
router.post('/:id/size', [authentication.checkLogin], productSizeController.update);
router.get('/:id/size', productSizeController.index);
router.get('/:id/product-size', productSizeController.sizes);
router.patch('/:id/sell/out', [authentication.checkLogin], productController.sellout);
router.patch('/:id/sell/in', [authentication.checkLogin], productController.selling);
router.patch('/:id/restore', [authentication.checkLogin], productController.restore);
router.delete('/:id/delete', [authentication.checkLogin], productController.delete);
router.post('/:id/edit', [upload.array('files', 10), authentication.checkLogin], productController.update);
router.get('/create', [authentication.checkLogin], productController.create);
router.get('/', [authentication.checkLogin], productController.index);

module.exports = router;