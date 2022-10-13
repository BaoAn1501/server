const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const categorySchema = new Schema({
    id: {
        type: ObjectId
    },
    name: {
        type: String,
        maxLength: 50,
        required: true,
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
});

categorySchema.set('timestamps', true);
module.exports = mongoose.model('category', categorySchema);