const reviewModel = require('./model')

exports.getByProduct = async (id) => {
    const reviews = await reviewModel.find({product_id: id}).populate(['user_id', 'product_id']);
    return reviews;
}

exports.getUserYet = async (id) => {
    const reviews = await reviewModel.find({user_id: id, status: false}).populate(['user_id', 'product_id']);
    console.log('get reviews yeu: ', reviews);
    return reviews;
}

exports.getUserAl = async (id) => {
    const reviews = await reviewModel.find({user_id: id, status: true}).populate(['user_id', 'product_id']);
    return reviews;
}

exports.insert = async (review) => {
    const r = new reviewModel(review);
    return await r.save();
}

exports.update = async (id, review) => {
    const u = await reviewModel.findByIdAndUpdate(id, {score: review.score, remarks: review.remarks, status: true}, {new: true});
    return u;
}