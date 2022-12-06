const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const wordSchema = new Schema({
    id: {
        type: ObjectId
    },
    value: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
});
wordSchema.set('timestamps', true);
module.exports = mongoose.model('word', wordSchema);