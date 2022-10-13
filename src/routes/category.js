const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/CategoryController');
const upload = require('../middleware/upload')

router.post('/create', upload.single('image') , categoryController.create );
router.get('/:id/edit', categoryController.one);
router.delete('/:id/delete', categoryController.delete);
router.post('/:id/edit', upload.single('image'), categoryController.update);
router.get('/', categoryController.index);

module.exports = router;