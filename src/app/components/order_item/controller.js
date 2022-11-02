const orderItemService = require('./service');

exports.getAll = async (id) => {
    let data = await orderItemService.getAll(id);
    data = data.map(item => {
        item = {
            _id: item._id,
            order_id: item.order_id,
            name: item.productSize_id.product_id.name,
            quantity: item.quantity,
            price: item.price
        }
        return item;
    });
    return data;
}

exports.insert = async (body) => {
    return await orderItemService.insert(body);
}



