const adminService = require('./service');
const bcrypt = require('bcryptjs');

exports.login = async (email, password) => {
    const user = await adminService.login(email);
    if (!user) {
        return 1;
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
        return 2;
    console.log('login controller');
    return {
        _id: user._id,
        email: user.email,
        admin: user.admin,
        full_name: user.full_name,
    };
}

exports.register = async (email, password, full_name, admin) => {
    let user = await adminService.login(email);
    if (user)
        return 1;
    const users = await adminService.getAll();
    const checkName  = users.some(item => {
        return item.full_name == full_name;
    })
    if(checkName==true){
        return 2;
    }
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    user = await adminService.register(email, hash, full_name, admin);
    return {
        _id: user._id
    };
}

exports.getAll = async () => {
    let data = await adminService.getAll();
    data = data.map(user => {
        user = {
            ...user?._doc
        }
        return user;
    });
    return data;
}

exports.delete = async (id) => {
    return await adminService.delete(id);
}

exports.change = async (id, active) => {
    return await adminService.changeOnline(id, active);
}



