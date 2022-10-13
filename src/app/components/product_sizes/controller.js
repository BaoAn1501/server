const categoryService = require('./service');

exports.getAll = async () => {
    let data = await categoryService.getAll();
    data = data.map(item => {
        item = {
            _id: item._id,
            name: item.name,
            image: item.image,
        }
        return item;
    });
    return data;
}

exports.getById = async (id) => {
    // const product = data.filter(item => item._id == id)[0];
    // return product;
    let category = await categoryService.getById(id);
    category = {
        _id: category._id,
        name: category.name,
        image: category.image,
    }
    return category;
}

exports.insert = async (body) => {
    return await categoryService.insert(body);
}

exports.delete = async (id) => {
    return await categoryService.delete(id);
}

exports.update = async (id, category) => {
    return await categoryService.update(id, category);
}