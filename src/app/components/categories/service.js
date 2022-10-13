const categoryModel = require('./model')

exports.getAll = async () => {
    return await categoryModel.find();
}

exports.getById = async (id) => {
    const category = await categoryModel.findById(id);
    console.log('get id in service');
    return category;
}

exports.insert = async (category) => {
    const p = new categoryModel(category);
    return await p.save();
}

exports.delete = async (id) => {
    console.log('delete in service');
    return await categoryModel.findByIdAndDelete(id);
}

exports.update = async (id, category) => {
    return await categoryModel.findByIdAndUpdate(id, category);
}