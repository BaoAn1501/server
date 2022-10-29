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
        required: true
    },
    image1: {
        type: String
    },
    image2: {
        type: String
    },
    image3: {
        type: String
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
    overrideMethods: 'all'
});

productSchema.set('timestamps', true);
module.exports = mongoose.model('product', productSchema);