const sizeModel = require('./model')

exports.getAll = async () => {
    return await sizeModel.find();
}

exports.getById = async (id) => {
    const size = await sizeModel.findById(id);
    return size;
}

exports.insert = async (size) => {
    const p = new sizeModel(size);
    return await p.save();
}

exports.delete = async (id) => {
    return await sizeModel.findByIdAndDelete(id);
}

exports.update = async (id, size) => {
    return await sizeModel.findByIdAndUpdate(id, size);
}