const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: { type: String, maxLength: 50},
    image: { type: String },
});

categorySchema.set('timestamps', true);
module.exports = mongoose.model('category', categorySchema);