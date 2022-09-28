const express = require('express');
const router = express.Router();
const userController = require('../app/components/users/controller');
const jwt = require('jsonwebtoken');

router.post('/register', async function (req, res, next) {
    const { full_name, email, password, confirm_password, phone_number, role } = req.body;
    const result = await userController.register(full_name, email, password, confirm_password, phone_number, role);

    if (result==1) {
        res.json({"result": "Mật khẩu không trùng khớp"});
    }
    else if(result==2) {
        res.json({"result": "Email đã được đăng ký trước đó"});
    } else if(result==3) {
        res.json({"result": "Số điện thoại đã được đăng ký trước đó"});
    } else {
        res.json({"result": "Đăng ký tài khoản thành công"});
    }
});

router.post('/login', async function (req, res, next) {
    const { email, password } = req.body;
    const result = await userController.login(email, password);
    if (result) {
        const token = jwt.sign({ _id: result._id, email: result.email }, 'myKey');
        res.json({ status: true, result, token });
    }
    else {
        res.json({ status: false });
    }
});

router.get('/users', async function (req, res, next) {
    const users = await userController.getAll();
    res.json(users);
});

module.exports = router;