const userModel = require('./model');

exports.login = async (email) => {
    const user = await userModel.findOne({
        email: email
    }, 'email password role');
    return user;
}

exports.register = async (full_name, email, password, phone_number) => {
    const user = new userModel({
        full_name,
        email,
        password,
        phone_number,
    });
    return await user.save();
}

exports.getAll = async () => {
    const users = userModel.find();
    return users;
}