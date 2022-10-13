const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UsersController');

router.get('/', userController.index);

module.exports = router;
