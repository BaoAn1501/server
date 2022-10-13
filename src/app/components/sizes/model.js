const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const sizeSchema = new Schema({
    id: {
        type: ObjectId
    },
    key: {
        type: String
    },
    value: {
        type: String
    },
});

module.exports = mongoose.model('size', sizeSchema);