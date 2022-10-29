const sizeService = require('./service');

exports.getAll = async () => {
    let data = await sizeService.getAll();
    data = data.map(item => {
        item = {
            _id: item._id,
            symbol: item.symbol,
            value: item.value,
            slug: item.slug,
        }
        return item;
    });
    return data;
}

exports.getBySlug = async (slug) => {
    let size = await sizeService.getBySlug(slug);
    size = {
        _id: size._id,
        symbol: size.symbol,
        value: size.value,
        slug: size.slug,
    }
    return size;
}

exports.getById = async (id) => {
    let size = await sizeService.getById(id);
    size = {
        _id: size._id,
        symbol: size.symbol,
        value: size.value,
        slug: size.slug,
    }
    return size;
}

exports.insert = async (body) => {
    const data = await sizeService.getAll();
    const isExisted = data.some((size) => {
        return size.symbol == body.symbol || size.value == body.value;
    });
    console.log(isExisted);
    if (isExisted) {
        return null;
    }
    return await sizeService.insert(body);
}

exports.delete = async (id) => {
    return await sizeService.delete(id);
}

exports.update = async (id, size) => {
    const data = await sizeService.getAll();
    const isExisted = data.some(siz => {
        return siz._id != id && (siz.symbol == size.symbol || siz.value == size.value);
    })
    if (isExisted) {
        return null;
    }
    return await sizeService.update(id, size);
}

getId = async (slug) => {

}