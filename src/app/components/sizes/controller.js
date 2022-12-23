const sizeService = require('./service');

exports.getAll = async () => {
    let data = await sizeService.getAll();
    data = data.map(item => {
        item = {
            ...item?._doc
        }
        return item;
    });
    return data;
}

exports.getBySlug = async (slug) => {
    let size = await sizeService.getBySlug(slug);
    size = {
        ...size?._doc
    }
    return size;
}

exports.getById = async (id) => {
    let size = await sizeService.getById(id);
    size = {
        ...size?._doc
    }
    return size;
}

exports.insert = async (body) => {
    const data = await sizeService.getAll();
    const isExisted = data.some((size) => {
        return size.symbol.toLowerCase() == body.symbol.toLowerCase() || size.value.toLowerCase() == body.value.toLowerCase();
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
        return siz._id != id && (siz.symbol.toLowerCase() == size.symbol.toLowerCase() || siz.value.toLowerCase() == size.value.toLowerCase());
    })
    if (isExisted) {
        return null;
    }
    return await sizeService.update(id, size);
}

getId = async (slug) => {

}