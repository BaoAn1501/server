const express = require('express');
const router = express.Router();
const categoryController = require('../app/application/CategoryController');
const productController = require('../app/application/ProductController');
const orderController = require('../app/application/OrderController');
const userController = require('../app/application/UserController');
const sizeController = require('../app/application/SizeController');

router.get('/categories/:id', categoryController.one);
router.get('/categories', categoryController.index);
router.post('/products/:id/:slug/save', productController.saveCart);
router.get('/products/:id/:slug', productController.oneSlug);
router.get('/products/:id/reviews/all', productController.reviews);
router.get('/products/:id', productController.one);
router.get('/products', productController.index);

router.get('/sizes/:id', sizeController.one);

router.post('/users/:id/address/insert', userController.addAddress);
router.post('/users/:id/address/:idAds/update', userController.updateAddress);
router.post('/users/:id/address/:idAds/delete', userController.deleteAddress);
router.get('/users/:id/address/get/default', userController.getDefaultAddress);
router.get('/users/:id/address/:idAds', userController.getAddress);
router.get('/users/:id/address', userController.allAddress);
router.post('/users/:id/cart/:cid/update/minus', productController.minusCart);
router.post('/users/:id/cart/:cid/update/plus', productController.plusCart);
router.post('/users/:id/cart/:cid/delete', productController.deleteCart);
router.post('/users/:id/cart/delete', productController.deleteAllCart);
router.post('/users/:id/cart/checkout', orderController.create);
router.get('/users/:id/cart', productController.cart);
router.post('/users/:id/orders/:ido/cancel', orderController.cancel);
router.post('/users/:id/orders/:ido/receive', orderController.receive);
router.get('/users/:id/orders/:ido', orderController.one);
router.get('/users/:id/orders/cancel/get', orderController.cancelList);
router.get('/users/:id/orders/taken/get', orderController.takenList);
router.get('/users/:id/orders/pending/get', orderController.pendingList);
router.get('/users/:id/orders/shipping/get', orderController.shippingList);
router.get('/users/:id/orders', orderController.index);
router.post('/users/:id/reviews/yet/:_id/rate', productController.rate);
router.get('/users/:id/reviews/yet', productController.getByUserYet);
router.get('/users/:id/reviews/already', productController.getByUserAl);
router.post('/users/:id/changeName', userController.changeName);
router.post('/users/:id/changePass', userController.changePass);
router.post('/reset-password', userController.resetPassword);
router.post('/users/:id/search/list/create', userController.saveSearch);
router.post('/users/:id/search/list/:_id/delete', userController.deleteSearch);
router.get('/users/:id/search/list', userController.showSearch);
router.post('/users/:id/search', productController.search);
router.get('/users/:id/logout', userController.logout);
router.get('/users/:id', userController.one);
// router.post('/orders/create', orderController.create);


module.exports = router;