const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const slug = require('mongoose-slug-generator');

const sizeSchema = new Schema({
    id: {
        type: ObjectId
    },
    symbol: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'symbol'
    }
});
mongoose.plugin(slug);
sizeSchema.set('timestamps', true);
module.exports = mongoose.model('size', sizeSchema);