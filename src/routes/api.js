const express = require('express');
const router = express.Router();
const categoryController = require('../app/application/CategoryController');
const productController = require('../app/application/ProductController');
const orderController = require('../app/application/OrderController');
const userController = require('../app/application/UserController');

router.get('/categories/:id', categoryController.one);
router.get('/categories', categoryController.index);
router.post('/products/:id/:slug/save', productController.saveCart);
router.get('/products/:id/:slug', productController.oneSlug);
router.get('/products/:id', productController.one);
router.get('/products', productController.index);

router.post('/users/:id/address/insert', userController.addAddress);
router.post('/users/:id/address/:idAds/update', userController.updateAddress);
router.post('/users/:id/address/:idAds/delete', userController.deleteAddress);
router.get('/users/:id/address/:idAds', userController.getAddress);
router.get('/users/:id/address', userController.allAddress);
router.post('/users/:id/cart/:cid/update/minus', productController.minusCart);
router.post('/users/:id/cart/:cid/update/plus', productController.plusCart);
router.post('/users/:id/cart/:cid/delete', productController.deleteCart);
router.post('/users/:id/cart/delete', productController.deleteAllCart);
router.get('/users/:id/cart', productController.cart);
router.post('/users/:id/changeName', userController.change);
router.get('/users/:id', userController.one);
// router.post('/orders/create', orderController.create);


module.exports = router;