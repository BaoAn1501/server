const adminModel = require('./model');

exports.login = async (email) => {
    const user = await adminModel.findOne({
        email: email
    }, 'email password');
    console.log('login service user:', user);
    return user;
}

exports.register = async (email, password) => {
    const user = new adminModel({
        email,
        password,
    });
    return await user.save();
}

exports.getAll = async () => {
    const users = adminModel.find();
    return users;
}