const express = require('express');
const router = express.Router();
const categoryController = require('../app/application/CategoryController');
const productController = require('../app/application/ProductController');
const orderController = require('../app/application/OrderController');
const userController = require('../app/application/UserController');

router.get('/categories/:id', categoryController.one);
router.get('/categories', categoryController.index);
router.get('/products/:id/:slug', productController.oneSlug);
router.get('/products/:id', productController.one);
router.post('/users/:id/address/insert', userController.addAddress);
router.post('/users/:id/address/:idAds/update', userController.updateAddress);
router.delete('/users/:id/address/:idAds/delete', userController.deleteAddress);
router.patch('/users/:id/address/:idAds/setDefault', userController.setDefault);
router.get('/users/:id/address/:idAds', userController.getAddress);
router.get('/users/:id/address', userController.allAddress);
router.get('/users/:id', userController.one);
router.get('/products', productController.index);
// router.post('/orders/create', orderController.create);


module.exports = router;