const express = require('express');
const router = express.Router();
const orderController = require('../app/controllers/OrderController');
const upload = require('../middleware/upload')
const authentication = require('../middleware/authentication');

router.post('/:id/status/ok', [authentication.checkLogin], orderController.ok);
router.post('/:id/status/cancel', [authentication.checkLogin], orderController.cancel);
router.get('/:id', [authentication.checkLogin], orderController.one);
router.get('/', [authentication.checkLogin], orderController.index);

module.exports = router;