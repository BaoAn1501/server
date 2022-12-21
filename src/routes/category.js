const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/CategoryController');
const upload = require('../middleware/upload')
const authentication = require('../middleware/authentication');
// categories/
router.get('/create', [authentication.checkLogin], categoryController.create);
router.post('/create', [upload.single('file'), authentication.checkLogin], categoryController.insert);
router.get('/:id/edit', [authentication.checkLogin], categoryController.one);
router.get('/:id/get-image', [authentication.checkLogin], categoryController.getImage);
router.delete('/:id/delete', [authentication.checkLogin], categoryController.delete);
router.post('/:id/edit', [upload.single('file'), authentication.checkLogin], categoryController.update);
router.get('/', [authentication.checkLogin], categoryController.index);

module.exports = router;