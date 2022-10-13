const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongooseDelete = require('mongoose-delete');

const productSchema = new Schema({
    id: {
        type: ObjectId
    },
    name: {
        type: String,
        maxLength: 50
    },
    images: {
        type: Array
    },
    status: {
        type: String
    },
    rating: {
        type: Number
    },
    description: {
        type: String
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    }
});
productSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

productSchema.set('timestamps', true);
module.exports = mongoose.model('product', productSchema);