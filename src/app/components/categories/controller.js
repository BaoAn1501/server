const categoryService = require('./service');

exports.getAll = async() => {
    let data = await categoryService.getCategories();
    data = data.map(item => {
        item = {
            name: item.name,
            image: item.image,
        }
        return item;
    });
    console.log('########## get categories controller ##########');
    return data;
}

exports.getById = async (id) => {
    // const product = data.filter(item => item._id == id)[0];
    // return product;
    let category = await categoryService.getById(id);
    category = {
        name: item.name,
        image: item.image,
    }
    console.log('########## getbyid categories controller ##########');
    return category;
}

exports.insert = async (body) => {
    console.log('########## insert categories controller ##########');
    await categoryService.insert(body);
}

exports.delete = async (id) => {
    console.log('########## delete categories controller ##########');
    await categoryService.delete(id);
}

exports.update = async (id, category) => {
    console.log('########## update categories controller ##########');
    await categoryService.update(id, category);
}
