const express = require('express');
const router = express.Router();
const orderController = require('../app/controllers/OrderController');
const upload = require('../middleware/upload')
const authentication = require('../middleware/authentication');

router.post('/:id/status/ok', [authentication.checkLogin], orderController.ok);
router.post('/:id/status/cancel', [authentication.checkLogin], orderController.cancel);
router.get('/:id', [authentication.checkLogin], orderController.one);
router.get('/10days/get', orderController.get10DaysAnalysis);
router.get('/today/get', orderController.getToday);
router.get('/all/get', orderController.getAll);
router.get('/', orderController.index);

module.exports = router;