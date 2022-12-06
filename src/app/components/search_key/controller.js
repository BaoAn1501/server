const service = require('./service');

exports.show = async (id) => {
    let data = await service.show(id);
    data = data.map(item => {
        item = {
            ...item?._doc,
        }
        return item;
    });
    return data;
}

exports.insert = async (data) => {
    return await service.insert(data);
}

exports.delete = async (id) => {
    return await service.delete(id);
}
