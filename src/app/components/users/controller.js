
const userService = require('./service');
const bcrypt = require('bcryptjs');

exports.login = async (email, password) => {
    const user = await userService.login(email);
    console.log(user, email, password);
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
        return null;
    return { _id: user._id, email: user.email, role: user.role };
}

exports.register = async (full_name, email, password, confirm_password, phone_number, role) => {
    if (password != confirm_password) 
        return 1;
    let user = await userService.login(email);
    if (user) 
        return 2;
    const users = await userService.getAll();
    const findPhone = users.find(user => user.phone_number === phone_number);
    if(findPhone) {
        return 3;
    }
    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    user = await userService.register(full_name, email, hash, phone_number, role);
    
    return 0;
}

exports.getAll = async () => {
    let data = await userService.getAll();
    data = data.map(user => {
        user = {
            full_name: user.full_name,
            email: user.email,
            phone_number: user.phone_number,
            role: user.role,
        }
        return user;
    });
    return data;
}
