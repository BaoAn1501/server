const cartModel = require('./model')

exports.getCart = async (id) => {
    const p = await cartModel.find({user_id: id})
    .populate(['productSize_id', 'user_id']).sort( {user_id: 1})
    return p;
}

exports.getById = async (id) => {
    const p = await cartModel.findById(id)
    .populate(['productSize_id', 'user_id']).sort( {user_id: 1})
    return p;
}

exports.getCartItem = async (productSize_id, user_id) => {
    const p = await cartModel.findOne({user_id: user_id, productSize_id: productSize_id})
    .populate(['productSize_id', 'user_id']).sort( {user_id: 1})
    console.log('cart item service: ', p);
    return p;
}

exports.insert = async (cart) => {
    const p = new cartModel(cart);
    return await p.save();
}

exports.delete = async (id) => {
    console.log('delete in service');
    return await cartModel.findByIdAndDelete(id);
}

exports.update = async (id, quantity) => {
    return await cartModel.findByIdAndUpdate(id, {quantity: quantity}, {new: true});
}