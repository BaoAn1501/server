const categoryModel = require('./model')

exports.getAll = async () => {
    console.log('########## get all categories service ##########');
    return await categoryModel.find();
}

exports.getById = async (id) => {
    const category = await categoryModel.findById(id);
    console.log('########## get category by id service ##########');
    return category;
}

exports.insert = async (category) => {
    const p = new categoryModel(category);
    console.log('########## insert category service ##########');
    await p.save();
}

exports.delete = async (id) => {
    console.log('########## delete categories service ##########');
    await categoryModel.findByIdAndDelete(id);
}

exports.update = async (id, category) => {
    const time = Date.now;
    console.log('########## update category service ##########');
    await categoryModel.findByIdAndUpdate(id, category);
}