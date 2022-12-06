const productService = require('./service');

exports.getAll = async () => {
    let data = await productService.getAll();
    data = data.map(item => {
        item = {
            ...item?._doc,
        }
        return item;
    });
    return data;
}

exports.getAllWithDeleted = async () => {
    let data = await productService.getAllWithDeleted();
    data = data.map(item => {
        item = {
            ...item?._doc,
        }
        return item;
    });
    return data;
}

exports.getById = async (id) => {
    let product = await productService.getById(id);
    product = {
        ...product?._doc
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

exports.restore = async (id) => {
    return await productService.restore(id);
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

exports.change = async (id, status) => {
    return await productService.change(id, status);
}

exports.search = async (text) => {
    let data = await productService.search(text);
    data = data.map(item => {
        item = {
            ...item?._doc
        }
        return item;
    });
    return data;
}