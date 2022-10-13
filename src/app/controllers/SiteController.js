const userController = require('../components/users/controller');
const jwt = require('jsonwebtoken');

class SiteController {
    // [GET] /
    index(req, res, next) {
        res.render('home');
    }
    // [POST] /register
    async register(req, res, next) {
        const {
            full_name,
            email,
            password,
            confirm_password,
            phone_number,
            role
        } = req.body;
        const result = await userController.register(full_name, email, password, confirm_password, phone_number, role);
        if (result == 1) {
            res.json({
                status: false,
                message: "Email đã được đăng ký trước đó"
            });
        } else if (result == 2) {
            res.json({
                status: false,
                message: "Mật khẩu phải có ít nhất 8 ký tự"
            });
        } else if (result == 3) {
            res.json({
                status: false,
                message: "Mật khẩu không trùng khớp"
            });
        } else if (result == 4) {
            res.json({
                status: false,
                message: "Số điện thoại đã được đăng ký trước đó"
            });
        } else {
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

    showLogin (req, res, next) {
        res.render('login');
    }
}

module.exports = new SiteController();