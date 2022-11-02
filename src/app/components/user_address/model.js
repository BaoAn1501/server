const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userAddressSchema = new Schema({
    id: {
        type: ObjectId
    },
    number: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    ward: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    default: {
        type: Boolean,
        default: false
    }
});

userAddressSchema.set('timestamps', true);
module.exports = mongoose.model('user_address', userAddressSchema);