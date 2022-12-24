const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/CategoryController');
const upload = require('../middleware/upload')
const authentication = require('../middleware/authentication');
// categories/
router.get('/create', [authentication.checkLogin], categoryController.create); // hiển thị trang tạo danh mục
router.post('/create', [upload.single('file'), authentication.checkLogin], categoryController.insert); // tạo danh mục mới
router.get('/:id/edit', [authentication.checkLogin], categoryController.one); // hiển thị danh mục để sửa
router.get('/:id/get-image', [authentication.checkLogin], categoryController.getImage); // lấy hình ảnh của của danh mục hiển thị trên trang sửa
router.delete('/:id/delete', [authentication.checkLogin], categoryController.delete); // xóa danh mục
router.post('/:id/edit', [upload.single('file'), authentication.checkLogin], categoryController.update); // cập nhật danh mục
router.get('/', [authentication.checkLogin], categoryController.index); // hiển thị toàn bộ danh mục

module.exports = router;