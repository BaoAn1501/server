const userController = require('../components/users/controller');
const adminController = require('../components/admin/controller');
const jwt = require('jsonwebtoken');

class SiteController {
    // [GET] /
    index(req, res, next) {
        res.render('home');
    }
    // [POST] /register/admin
    async registerAd(req, res, next) {
        const {
            email,
            password,
            confirm_password,
        } = req.body;
        const result = await adminController.register(email, password, confirm_password);
        if (result == 1) {
            res.json({
                status: false,
                message: "Email đã được đăng ký trước đó"
            });
        } else if (result == 2) {
            res.json({
                status: false,
                message: "Chỉ đăng ký 1 tài khoản admin"
            });
        } else {
            res.json({
                status: true,
                message: "Đăng ký tài khoản thành công"
            });
        }
    }
    // [POST] /login/admin
    async loginAd(req, res, next) {
        const {
            email,
            password
        } = req.body;
        const result = await adminController.login(email, password);
        if (result == 1) {
            // res.json({
            //     status: false,
            //     message: "Email chưa được đăng ký"
            // });
            // console.log('login error');
            res.redirect('/login/admin');
        } else if (result == 2) {
            // res.json({
            //     status: false,
            //     message: "Sai mật khẩu"
            // });
            // console.log('login error');
            res.redirect('/login/admin');
        } else {
            const token = jwt.sign({
                _id: result._id,
                email: result.email
            }, 'myKey');
            req.session.token = token;
            // res.json({
            //     status: true,
            //     message: "Đăng nhập thành công",
            //     result,
            //     token
            // });
            console.log('login success token: ', token);
            res.redirect('/');
        }
    }
    // [POST] /register
    async register(req, res, next) {
        const {
            full_name,
            email,
            password,
            confirm_password,
            phone_number,
        } = req.body;
        const result = await userController.register(full_name, email, password, confirm_password, phone_number);
        if (result == 1) {
            console.log('result: ', result);
            res.json({
                status: false,
                message: "Email đã được đăng ký trước đó"
            });
        } else if (result == 2) {
            console.log('result: ', result);
            res.json({
                status: false,
                message: "Số điện thoại đã được đăng ký trước đó"
            });
        } else {
            console.log('result: ', result);
            res.json({
                status: true,
                message: "Đăng ký tài khoản thành công"
            });
        }
    }
    // [POST] /login
    async login(req, res, next) {
        const {
            email,
            password
        } = req.body;
        const result = await userController.login(email, password);
        if (result == 1) {
            res.json({
                status: false,
                message: "Email chưa được đăng ký"
            });
        } else if (result == 2) {
            res.json({
                status: false,
                message: "Sai mật khẩu"
            });
        } else {
            const token = jwt.sign({
                _id: result._id,
                email: result.email
            }, 'myKey');
            res.json({
                status: true,
                message: "Đăng nhập thành công",
                result,
                token
            });
        }
    }

    showLogin(req, res, next) {
        res.render('login');
    }

    logOut(req, res, next){
        req.session.destroy(function(error){
            res.redirect('/login/admin');
        });
    }
}

module.exports = new SiteController();