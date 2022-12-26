const express = require('express');
const router = express.Router();
const analysisController = require('../app/controllers/AnalysisController');
const authentication = require('../middleware/authentication');

router.get('/get7days/get', [authentication.checkLogin], analysisController.get7Days);
router.get('/day/products/get', [authentication.checkLogin], analysisController.sellDay);
router.get('/month/:m/rates/get', [authentication.checkLogin], analysisController.ratingMonth);
router.get('/month/:m/products/get', [authentication.checkLogin], analysisController.sellMonth);
router.get('/months/rates/get', [authentication.checkLogin], analysisController.rating_months);
router.get('/month/:m/revenue/get', [authentication.checkLogin], analysisController.get30Days);
router.get('/months/revenue/get', [authentication.checkLogin], analysisController.revenue_months);
router.get('/', [authentication.checkLogin], analysisController.index);

module.exports = router;