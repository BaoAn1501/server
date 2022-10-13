const productSizeModel = require('./model')

exports.getAll = async () => {
    return await productSizeModel.find().populate(['size_id','product_id']);
}

exports.getById = async (id) => {
    const size = await productSizeModel.findById(id).populate(['size_id','product_id']);
    return size;
}

exports.insert = async (size) => {
    const p = new productSizeModel(size);
    return await p.save();
}

exports.delete = async (id) => {
    return await productSizeModel.findByIdAndDelete(id);
}

exports.update = async (id, size) => {
    return await productSizeModel.findByIdAndUpdate(id, size);
}