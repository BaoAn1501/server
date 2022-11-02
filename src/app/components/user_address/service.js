const addressModel = require('./model');

exports.getAll = async (id) => {
    const allAddress = await addressModel.find({
        user_id: id
    }).populate('user_id');
    console.log('all address service: ', allAddress);
    return allAddress;
}

exports.getById = async (id) => {
    const address = await addressModel.findById(id).populate('user_id');
    return address;
}

exports.insert = async (data) => {
    const p = new addressModel(data);
    return await p.save();
}

exports.update = async (id, data) => {
    return await addressModel.findByIdAndUpdate(id, data);
}

exports.delete = async (id) => {
    return await addressModel.deleteById(id);
}