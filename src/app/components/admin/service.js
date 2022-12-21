const adminModel = require('./model');

exports.login = async (email) => {
    const user = await adminModel.findOne({
        email: email
    }, 'email password admin full_name');
    console.log('login service user:', user);
    return user;
}

exports.register = async (email, password, full_name, admin) => {
    const user = new adminModel({
        email,
        password,
        full_name,
        admin
    });
    return await user.save();
}

exports.getAll = async () => {
    const users = adminModel.find();
    return users;
}