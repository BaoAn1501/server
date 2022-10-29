const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/CategoryController');
const upload = require('../middleware/upload')
const authentication = require('../middleware/authentication');

router.get('/create', [authentication.checkLogin], categoryController.create);
router.post('/create', [upload.single('image'), authentication.checkLogin], categoryController.insert);
router.get('/:id/edit', [authentication.checkLogin], categoryController.one);
router.delete('/:id/delete', [authentication.checkLogin], categoryController.delete);
router.post('/:id/edit', [upload.single('image'), authentication.checkLogin], categoryController.update);
router.get('/', [authentication.checkLogin], categoryController.index);

module.exports = router;