const userService = require('./service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { HOST } = require('../../../util/constants');
const mailgun = require('mailgun-js');


exports.login = async (email, password) => {
    const user = await userService.login(email);
    if (!user) {
        return 1;
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
        return 2;
    return {
        _id: user._id,
        email: user.email,
    };
}

exports.register = async (full_name, email, password) => {
    let user = await userService.login(email);
    if (user)
        return 1;
    const users = await userService.getAll();
    const checkName  = users.some(item => {
        return item.full_name == full_name;
    })
    if(checkName==true){
        return 2;
    }
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    user = await userService.register(full_name, email, hash);
    return {
        _id: user._id
    };
}

exports.forgot = async (email) => {
    let user = await userService.login(email);
    if(email !== user.email){
        return 1;
    }
    const payload = {
        id: user._id,
        email: user.email
    }
    const token = jwt.sign(payload, 'myKey', {expiresIn: '3m'});
    console.log('token: ', token);
    const data = {
        from: 'noreply@hello.com',
        to: email,
        subject: 'Account activation link',
        html: `
            <h2>Nhấn vào link để đặt lại mật khẩu</h2>
            <p>${HOST}/user/reset/${token}</p>`
    }
    const updateLink = await userService.updateLink(token);
    if(!updateLink){
        return null;
    } else {
        
    }
    
}

exports.getAll = async () => {
    let data = await userService.getAll();
    data = data.map(user => {
        user = {
            ...user?._doc
        }
        return user;
    });
    return data;
}

exports.getById = async (id) => {
    let user = await userService.getById(id);
    user = {
        ...user?._doc
    }
    return user;
}

exports.delete = async (id) => {
    return await userService.delete(id);
}

exports.update = async (id, full_name) => {
    return await userService.update(id, full_name);
}



