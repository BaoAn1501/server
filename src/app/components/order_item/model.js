const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongooseDelete = require('mongoose-delete');

const orderItemSchema = new Schema({
    id: {
        type: ObjectId
    },
    productSize_id: {
        type: ObjectId,
        ref: 'product_size',
    },
    order_id: {
        type: ObjectId,
        ref: 'order',
        required: true,
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    }
});

orderItemSchema.set('timestamps', true);
module.exports = mongoose.model('order_item', orderItemSchema);