const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');
const userController = require('../app/controllers/UsersController');
// users/
router.get('/register',[authentication.checkLogin], userController.registerView);
router.get('/',[authentication.checkLogin], userController.index);

module.exports = router;
