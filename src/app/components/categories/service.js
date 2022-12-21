const categoryModel = require('./model')

exports.getAll = async () => {
    const p = await categoryModel.find();
    return p;
}

exports.getById = async (id) => {
    const category = await categoryModel.findById(id);
    return category;
}

exports.insert = async (category) => {
    const p = new categoryModel(category);
    return await p.save();
}

exports.delete = async (id) => {
    return await categoryModel.findByIdAndDelete(id);
}

exports.update = async (id, category) => {
    return await categoryModel.findByIdAndUpdate(id, category);
}