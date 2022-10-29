const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const adminSchema = new Schema({
    id: {
        type: ObjectId
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    },
});

adminSchema.set('timestamps', true);
module.exports = mongoose.model('admin', adminSchema);