const model = require('./model');

exports.inDay = async (today) => {
    const user = await adminModel.findOne({
        email: email
    }, 'email password');
    console.log('login service user:', user);
    return user;
}
