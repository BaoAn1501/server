const express = require('express');
const router = express.Router();
const analysisController = require('../app/controllers/AnalysisController');
const authentication = require('../middleware/authentication');

router.get('/get7days/get', analysisController.get7Days);
router.get('/day/:date/products/get', analysisController.sellDay);
router.get('/month/rates/get', analysisController.ratingMonth);
router.get('/', [authentication.checkLogin], analysisController.index);

module.exports = router;