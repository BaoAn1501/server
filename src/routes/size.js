const express = require('express');
const router = express.Router();
const sizeController = require('../app/controllers/SizesController');

router.get('/:id', sizeController.one);
router.get('/', sizeController.index);

module.exports = router;