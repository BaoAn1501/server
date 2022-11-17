const cartService = require('./service');

exports.getAll = async () => {
    let data = await cartService.getCart();
    data = data.map(item => {
        item = {
            _id: item._id,
            productSize_id: item.productSize_id,
            user_id: item.user_id,
            quantity: item.quantity,
        }
        return item;
    });
    return data;
}

exports.insert = async (cart) => {
    return await cartService.insert(cart);
}

exports.delete = async (id) => {
    return await cartService.delete(id);
}

exports.update = async (id, cart) => {
    return await cartService.update(id, cart);
}