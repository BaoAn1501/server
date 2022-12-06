const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const analysisSchema = new Schema({
    id: {
        type: ObjectId
    },
    time: {
        type: String 
    },
    money: {
        type: number
    },
});

module.exports = mongoose.model('admin', analysisSchema);