const express = require('express');
const router = express.Router();
const analysisController = require('../app/controllers/AnalysisController');
const authentication = require('../middleware/authentication');

router.get('/today', analysisController.getThisWeek);
router.get('/', [authentication.checkLogin], analysisController.index);

module.exports = router;