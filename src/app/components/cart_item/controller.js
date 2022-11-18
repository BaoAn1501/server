const cartService = require('./service');

exports.getAll = async (id) => {
    let data = await cartService.getCart(id);
    data = data.map(item => {
        item = {
            ...item?._doc
        }
        return item;
    });
    return data;
}

exports.getById = async (id) => {
    let data = await cartService.getById(id);
    data = {
        ...data?._doc
    }
    console.log('has data', data);
    return data;
}

exports.getOne = async (productSize_id, user_id) => {
    let data = await cartService.getCartItem(productSize_id, user_id);
    console.log('cart item controller: ', data);
    if(data){
        data = {
            ...data?._doc
        }
        console.log('has data', data);
        return data;
    }
    else {
        console.log('no data', data);
        return null;
    }
}

exports.insert = async (cart) => {
    return await cartService.insert(cart);
}

exports.delete = async (id) => {
    return await cartService.delete(id);
}

exports.update = async (id, quantity) => {
    return await cartService.update(id, quantity);
}