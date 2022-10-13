const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSizeSchema = new Schema({
    id: {
        type: ObjectId
    },
    size_id: {
        type: Schema.Types.ObjectId,
        ref: 'size',
        required: true,
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});
productSizeSchema.set('timestamps', true);
module.exports = mongoose.model('size', productSizeSchema);