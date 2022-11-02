const productModel = require('./model')

exports.getAll = async () => {
    console.log('lấy tất cả sản phẩm service');
    return await productModel.find().populate('category_id');
}

exports.getById = async (id) => {
    return await productModel.findById(id).populate('category_id');
}

exports.insert = async (product) => {
    const p = new productModel(product);
    return await p.save();
}

exports.delete = async (id) => {
    return await productModel.deleteById(id);
}

exports.update = async (id, product) => {
    return await productModel.findByIdAndUpdate(id, product);
}