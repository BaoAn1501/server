const express = require('express');
const router = express.Router();
const sizeController = require('../app/controllers/SizeController');
const authentication = require('../middleware/authentication');
//sizes/
router.get('/create', [authentication.checkLogin], sizeController.create); // hiển thị trang thêm size
router.post('/create', [authentication.checkLogin], sizeController.insert); 
router.post('/:id/edit', [authentication.checkLogin], sizeController.update);
router.get('/:id/edit', [authentication.checkLogin], sizeController.one); // hiển thị sửa size
router.delete('/:id/delete', [authentication.checkLogin], sizeController.delete);
router.get('/', [authentication.checkLogin], sizeController.index); // hiển thị toàn bộ size

module.exports = router;