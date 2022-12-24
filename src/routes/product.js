const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const productSizeController = require('../app/controllers/ProductSizeController');
const upload = require('../middleware/upload');
const authentication = require('../middleware/authentication');
// products/
router.post('/create', [upload.array('files', 10), authentication.checkLogin], productController.insert); // thêm sản phẩm
router.get('/:id/edit/category', [authentication.checkLogin], productController.getCategory); 
router.get('/:id/edit', [authentication.checkLogin], productController.one); // hiển thị sản phẩm để sửa
router.get('/:id/get-images', [authentication.checkLogin], productController.getImages); // lấy hình ảnh sản phẩm hiển thị lúc sửa
router.post('/:id/size', [authentication.checkLogin], productSizeController.update);    // cập nhật giá cho sản phẩm
router.get('/:id/size', productSizeController.index); 
router.get('/:id/product-size', productSizeController.sizes); // hiển thị trang chỉnh giá
router.patch('/:id/sell/out', [authentication.checkLogin], productController.sellout); // bán hết sản phẩm
router.patch('/:id/sell/in', [authentication.checkLogin], productController.selling); // còn hàng sản phẩm
router.patch('/:id/restore', [authentication.checkLogin], productController.restore); // khôi phục sản phẩm bị xóa
router.delete('/:id/delete', [authentication.checkLogin], productController.delete); // xóa sản phẩm
router.post('/:id/edit', [upload.array('files', 10), authentication.checkLogin], productController.update); // sửa sản phẩm
router.get('/create', [authentication.checkLogin], productController.create); // hiển thị trang thêm sản phẩm
router.get('/', [authentication.checkLogin], productController.index); // hiển thị tất cả sản phẩm bao gồm sp bị xóa

module.exports = router;