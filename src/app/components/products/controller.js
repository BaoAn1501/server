const productService = require('./service');

exports.getAll = async () => {
    let data = await productService.getAll();
    data = data.map(item => {
        item = {
            _id: item._id,
            name: item.name,
            description: item.description,
            image1: item.image1,
            image2: item.image2,
            image3: item.image3,
            status: item.status.name,
            rating: item.rating,
            category_id: item.category_id
        }
        return item;
    });
    return data;
}

exports.getById = async (id) => {
    let product = await productService.getById(id);
    product = {
        _id: product._id,
        name: product.name,
        image1: product.image1,
        image2: product.image2,
        image3: product.image3,
        status: product.status,
        rating: product.rating,
        description: product.description,
        category: product.category_id.name
    }
    return product;
}

exports.insert = async (body) => {
    const data = await productService.getAll();
    const isExisted = data.some(product => {
        return product.name == body.name;
    })
    if (isExisted) {
        return null;
    }
    return await productService.insert(body);
}

exports.delete = async (id) => {
    return await productService.delete(id);
}

exports.update = async (id, product) => {
    const data = await productService.getAll();
    const isExisted = data.some(p => {
        return p._id != id && p.name == product.name;
    })
    if (isExisted) {
        return null;
    }
    return await productService.update(id, product);
}