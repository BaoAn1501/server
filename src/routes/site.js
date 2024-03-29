const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');
const userController = require('../app/application/UserController');
const authentication = require('../middleware/authentication');

router.post('/register/admin', siteController.registerAd);
router.post('/login/admin', siteController.loginAd);
router.post('/register', siteController.register);
router.post('/login', siteController.login);
router.post('/password/reset/:email', userController.getToken);
router.get('/password/reset/:email', userController.showResetForm);
router.get('/password/reset', userController.showResetForm);
router.get('/login/admin', [authentication.checkLogin], siteController.showLogin);
router.get('/logout/admin', [authentication.checkLogin], siteController.logOut);
router.get('/', [authentication.checkLogin], siteController.index);

module.exports = router;
