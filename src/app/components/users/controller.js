const userService = require('./service');
const bcrypt = require('bcryptjs');

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

exports.register = async (full_name, email, password, confirm_password, phone_number) => {
    let user = await userService.login(email);
    if (user)
        return 1;
    const users = await userService.getAll();
    const findPhone = users.find(user => user.phone_number === phone_number);
    if (findPhone) {
        return 2;
    }
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    user = await userService.register(full_name, email, hash, phone_number);
    return {
        _id: user._id
    };
}

exports.getAll = async () => {
    let data = await userService.getAll();
    data = data.map(user => {
        user = {
            full_name: user.full_name,
            email: user.email,
            phone_number: user.phone_number,
        }
        return user;
    });
    return data;
}