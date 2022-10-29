const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongooseDelete = require('mongoose-delete');

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
productSizeSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});
productSizeSchema.set('timestamps', true);
module.exports = mongoose.model('product_size', productSizeSchema);