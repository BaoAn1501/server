const express = require('express');
const router = express.Router();
const analysisController = require('../app/controllers/AnalysisController');
const authentication = require('../middleware/authentication');

router.get('/get7days/get', [authentication.checkLogin], analysisController.get7Days);
router.get('/day/:date/products/get', [authentication.checkLogin], analysisController.sellDay);
router.get('/month/rates/get', [authentication.checkLogin], analysisController.ratingMonth);
router.get('/month/:m/revenue/get', [authentication.checkLogin], analysisController.get30Days);
router.get('/', [authentication.checkLogin], analysisController.index);

module.exports = router;