const orderService = require('./service');

exports.getAll = async () => {
    let data = await orderService.getAll();
    data = data.map(item => {
        item = {
            ...item?._doc
        }
        return item;
    });
    return data;
}

exports.getById = async (id) => {
    let item = await orderService.getById(id);
    item = {
        ...item?._doc
    }
    return item;
}

exports.insert = async (body) => {
    return data = await orderService.insert(body);
}

exports.update = async (id, status) => {
    return await orderService.change(id, status);
}

exports.getDay = async (begin, end) => {
    let data = await orderService.getInDay(begin, end);
    data = data.map(item => {
        item = {
            ...item?._doc
        }
        return item;
    });
    return data;
}