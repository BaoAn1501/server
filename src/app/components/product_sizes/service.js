const productSizeModel = require('./model');
const sizeService = require('../sizes/service');

exports.getAll = async (id) => {
    return await productSizeModel.find({
        product_id: id
    }).populate(['size_id', 'product_id']).sort( {size_id: 1});
}

exports.getOne = async (id, size) => {
    return await productSizeModel.findOne({
        size_id: size,
        product_id: id
    }).populate(['size_id', 'product_id']);
}

exports.getById = async (id) => {
    return await productSizeModel.findById(id).populate(['size_id', 'product_id']);
}

exports.insert = async (body) => {
    const p = new productSizeModel(body);
    return await p.save();
}

exports.update = async (id, size, price) => {
    const p = productSizeModel.findOneAndUpdate({
        size_id: size,
        product_id: id
    }, {$set:{price: price}}, {new: true});
    console.log('p: ', p);
    return await p;
}