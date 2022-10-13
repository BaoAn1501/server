const productService = require('./service');

exports.getAll = async () => {
    let data = await productService.getAll();
    data = data.map(item => {
        item = {
            _id: item._id,
            name: item.name,
            images: [item.images],
            status: item.status,
            rating: item.rating,
            description: item.description,
            category: item.category_id.name
        }
        return item;
    });
    return data;
}

exports.getById = async (id) => {
    // const product = data.filter(item => item._id == id)[0];
    // return product;
    let product = await productService.getById(id);
    product = {
        _id: product._id,
        name: product.name,
        images: [product.images],
        status: product.status,
        rating: product.rating,
        description: product.description,
        category: product.category_id.name
    }
    return product;
}

exports.insert = async (body) => {
    return await productService.insert(body);
}

exports.delete = async (id) => {
    return await productService.delete(id);
}

exports.update = async (id, category) => {
    return await productService.update(id, category);
}