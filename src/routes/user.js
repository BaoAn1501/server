const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');
const adminController = require('../app/controllers/UsersController');
// users/
router.get('/current/get',[authentication.checkLogin], adminController.getCurrentUser);
router.get('/register',[authentication.checkLogin], adminController.registerView);
router.delete('/:id/delete',[authentication.checkLogin], adminController.deleteUser);
router.get('/get-all',[authentication.checkLogin], adminController.getAllUsers);
router.get('/',[authentication.checkLogin], adminController.index);

module.exports = router;
