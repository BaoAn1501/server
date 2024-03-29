const reviewService = require('./service');

exports.getByProduct = async (id) => {
    let data = await reviewService.getByProduct(id);
    data = data.map(item => {
        item = {
            ...item?._doc,
        }
        return item;
    });
    return data;
}

exports.getInDay = async (begin, end) => {
    let data = await reviewService.getInDay(begin, end);
    data = data.map(item => {
        item = {
            ...item?._doc,
        }
        return item;
    });
    return data;
}

exports.getByUserYet = async (id) => {
    let data = await reviewService.getUserYet(id);
    console.log('data reviews yet: ', data);
    data = data.map(item => {
        item = {
            ...item?._doc,
        }
        return item;
    });
    return data;
}

exports.getByUserAl = async (id) => {
    let data = await reviewService.getUserAl(id);
    data = data.map(item => {
        item = {
            ...item?._doc,
        }
        return item;
    });
    return data;
}

exports.insert = async (data) => {
    return await reviewService.insert(data);
}

exports.update = async (id, data) => {
    return await reviewService.update(id, data);
}
