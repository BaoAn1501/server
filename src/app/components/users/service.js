const userModel = require('./model');

exports.login = async (email) => {
    const user = await userModel.findOne({
        email: email
    }, 'email password');
    return user;
}

exports.register = async (full_name, email, password) => {
    const user = new userModel({
        full_name,
        email,
        password,
    });
    return await user.save();
}

exports.getAll = async () => {
    const users = userModel.find().sort({ full_name: 1});
    return users;
}

exports.getById = async (id) => {
    const user = await userModel.findById(id);
    return user;
}

exports.update = async (id, full_name) => {
    return await userModel.findByIdAndUpdate(id, {full_name: full_name});
}

exports.updatePassword = async (id, newPassword) => {
    return await userModel.findByIdAndUpdate(id, {password: newPassword});
}

exports.updateLink = async (token) => {
    return await userModel.updateOne({resetLink: token});
}