const express = require('express');
const router = express.Router();
const sizeController = require('../app/controllers/SizeController');
const authentication = require('../middleware/authentication');

router.get('/create', [authentication.checkLogin], sizeController.create); // hiển thị trang thêm sản phẩm
router.post('/create', [authentication.checkLogin], sizeController.insert); // phương thức tạo sản phẩm
router.post('/:id/edit', [authentication.checkLogin], sizeController.update);
router.get('/:id/edit', [authentication.checkLogin], sizeController.one);
router.delete('/:id/delete', [authentication.checkLogin], sizeController.delete);
router.get('/', [authentication.checkLogin], sizeController.index);

module.exports = router;