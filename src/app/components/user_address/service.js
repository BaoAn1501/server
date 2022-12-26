const addressModel = require('./model');

exports.getAll = async (id) => {
    const allAddress = await addressModel.find({
        user_id: id
    }).populate('user_id').sort({default: -1});
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
    console.log('update address service: ');
    return await addressModel.findByIdAndUpdate(id, data, {new: true});
}

exports.updateUserID = async (id, userID) => {
    console.log('update address service: ');
    return await addressModel.findByIdAndUpdate(id, {user_id: userID}, {new: true});
}

exports.delete = async (id) => {
    return await addressModel.findByIdAndDelete(id);
}

exports.setDefault = async (id) => {
    return await addressModel.findByIdAndUpdate(id, {
        default: true
    })
}

exports.setNonDefault = async (id) => {
    return await addressModel.findByIdAndUpdate(id, {
        default: false
    })
}