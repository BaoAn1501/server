const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userAddressSchema = new Schema({
    id: {
        type: ObjectId
    },
    number: { // số nhà
        type: String,
        required: true
    },
    street: { // đường
        type: String,
        required: true
    },
    ward: { // phường
        type: String,
        required: true
    },
    district: { // quận
        type: String,
        required: true
    },
    city: { // thành phố
        type: String,
        required: true
    },
    phone_number: { // sdt
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