const userModel = require('./model');

exports.login = async (email) => {
    const user = await userModel.findOne({email:email}, 'email password');
    return user;
}

exports.register = async (full_name, email, password, phone_number, role) => {
    const user = new userModel({full_name, email, password, phone_number, role});
    return await user.save();
}

exports.getAll = async () => {
    const users = userModel.find();
    return users;
}