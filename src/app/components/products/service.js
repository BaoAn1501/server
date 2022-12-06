const productModel = require('./model')

exports.getAll = async () => {
    const p = await productModel.find().populate('category_id');
    return p;
}

exports.getAllWithDeleted = async () => {
    const p = await productModel.findWithDeleted().populate('category_id');
    return p;
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

exports.restore = async (id) => {
    return await productModel.restore({_id: id});
}

exports.update = async (id, product) => {
    return await productModel.findByIdAndUpdate(id, product);
}

exports.change = async (id, status) => {
    return await productModel.findByIdAndUpdate(id, {status: status});
}

exports.search = async (text) => {
    return await productModel.find({name: {$regex : text, $options: 'i' } }).populate('category_id');
}