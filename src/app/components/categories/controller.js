const categoryService = require('./service');

exports.getAll = async () => {
    console.log('lay tat ca loai / controller');
    let data = await categoryService.getAll();
    data = data.map(item => {
        item = {
            _id: item._id,
            name: item.name,
            description: item.description,
            image: item.image,
        }
        return item;
    });
    return data;
}

exports.getById = async (id) => {
    let category = await categoryService.getById(id);
    category = {
        _id: category._id,
        name: category.name,
        description: category.description,
        image: category.image,
    }
    return category;
}

exports.insert = async (body) => {
    const data = await categoryService.getAll();
    const isExisted = data.some(category => {
        return category.name == body.name;
    })
    if (isExisted) {
        return null;
    }
    return await categoryService.insert(body);
}

exports.delete = async (id) => {
    return await categoryService.delete(id);
}

exports.update = async (id, category) => {
    const data = await categoryService.getAll();
    const isExisted = data.some(cat => {
        return cat._id != id && cat.name == category.name;
    })
    if (isExisted) {
        return null;
    }
    return await categoryService.update(id, category);
}