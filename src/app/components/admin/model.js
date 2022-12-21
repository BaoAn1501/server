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
    full_name: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean, 
        default: true
    },
    active: {
        type: Boolean,
        default: false
    }

});

adminSchema.set('timestamps', true);
module.exports = mongoose.model('admin', adminSchema);