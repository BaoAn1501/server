module.exports = {
    arrayMongooseToObject: function (array) {
        return array.map(object => object.toObject())
    },
    mongooseToObject: function (object) {
        return object ? object.toObject() : object
    }
}