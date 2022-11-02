const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongooseDelete = require('mongoose-delete');
const { enumStatusOrder } = require('../../../util/constants');

const orderSchema = new Schema({
    id: {
        type: ObjectId
    },
    user_id: {
        type: ObjectId,
        ref: 'user',
    },
    payment_id: {
        type: ObjectId,
        ref: 'payment_detail'
    },
    status: {
        type: Object,
        default: enumStatusOrder.pending
    },
    total_amount: {
        type: Number
    }
});

orderSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});
orderSchema.set('timestamps', true);
module.exports = mongoose.model('order', orderSchema);