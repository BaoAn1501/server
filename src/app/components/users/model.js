const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    full_name: {type: String },
    email: { type: String },
    password: { type: String },
    phone_number: { type: String },
    role: { type: String, default: "customer"},
    avatar: { type: String },
});

userSchema.set('timestamps', true);
module.exports = mongoose.model('user', userSchema);