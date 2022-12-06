const model = require('./model')

exports.show = async (id) => {
    const list = await model.find({user_id: id}).populate(['user_id']).sort({createdAt: -1}).limit(5);
    return list;
}

exports.insert = async (key) => {
    const r = new model(key);
    return await r.save();
}

exports.delete = async (id) => {
    return await model.findByIdAndDelete(id);
}