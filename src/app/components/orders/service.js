const orderModel = require('./model')

exports.getAll = async () => {
    const o =  await orderModel.find().populate(['userAddress_id']).sort({updatedAt: -1});
    return o;
}

// exports.getOneUser = async (id) => {
//     return await orderModel.find({
//         user_id: id
//     }).populate(['userAddress_id', 'payment_id']);
// }

exports.getById = async (id) => {
    const one = await orderModel.findById(id).populate(['userAddress_id']);
    return one;
}

exports.insert = async (order) => {
    const o = new orderModel(order);
    return await o.save();
}

exports.change = async (id, status) => {
    const o = await orderModel.findByIdAndUpdate(id, {status: status});
    return o;
}

