const express = require('express');
const router = express.Router();
const sizeController = require('../app/controllers/SizeController');
const authentication = require('../middleware/authentication');
//sizes/
router.get('/create', [authentication.checkLogin], sizeController.create); // hiển thị trang thêm size
router.post('/create', [authentication.checkLogin], sizeController.insert); // tạo size mới
router.post('/:id/edit', [authentication.checkLogin], sizeController.update); // cập nhật size
router.get('/:id/edit', [authentication.checkLogin], sizeController.one); // hiển thị size để sửa
router.delete('/:id/delete', [authentication.checkLogin], sizeController.delete);   // xóa size
router.get('/', [authentication.checkLogin], sizeController.index); // hiển thị toàn bộ size

module.exports = router;

