const cartModel = require('./model')

exports.getCart = async (id) => {
    const p = await cartModel.find({user_id: id})
    .populate(['productSize_id', 'user_id']).sort( {user_id: 1})
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
    return await cartModel.findByIdAndUpdate(id, {
        quantity: quantity
    });
}