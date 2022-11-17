const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cartItemSchema = new Schema({
    id: {
        type: ObjectId
    },
    productSize_id: {
        type: Schema.Types.ObjectId,
        ref: 'product_size',
        required: true,
    },
    quantity: {
        type: Number
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
});

cartItemSchema.set('timestamps', true);
module.exports = mongoose.model('cart_item', cartItemSchema);