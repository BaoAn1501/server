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
    console.log('login controller');
    return {
        _id: user._id,
        email: user.email,
    };
}

exports.register = async (email, password) => {
    let user = await userService.login(email);
    if (user)
        return 1;
    const users = await userService.getAll();
    if(users.length>0){
        return 2;
    }
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    user = await userService.register(email, hash);
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
        }
        return user;
    });
    return data;
}