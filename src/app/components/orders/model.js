const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const { enumStatusOrder } = require('../../../util/constants');

const orderSchema = new Schema({
    id: {
        type: ObjectId
    },
    userAddress_id: {
        type: ObjectId,
        ref: 'user_address',
    },
    payment_id: {
        type: Number
    },
    status: {
        type: Object,
        default: enumStatusOrder.pending
    },
    total: {
        type: Number
    }
});

orderSchema.set('timestamps', true);
module.exports = mongoose.model('order', orderSchema);