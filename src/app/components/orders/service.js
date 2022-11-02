const orderModel = require('./model')

exports.getAll = async (id) => {
    return await orderModel.find({
        user_id: id
    }).populate(['user_id', 'payment_id']);
}

exports.getById = async (id) => {
    const category = await orderModel.findById(id);
    return category;
}

exports.insert = async (order) => {
    const p = new orderModel(order);
    return await p.save();
}

