const { text } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongooseDelete = require('mongoose-delete');
const { enumStatusProduct } = require('../../../util/constants');

const productSchema = new Schema({
    id: {
        type: ObjectId
    },
    name: {
        type: String,
        maxLength: 50,
        required: true,
    },
    images: {
        type: Array,
        default: []
    },
    status: {
        type: Object,
        default: enumStatusProduct.selling
    },
    rating: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
});
productSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: ['all','find','findOne']
});

productSchema.set('timestamps', true);
module.exports = mongoose.model('product', productSchema);