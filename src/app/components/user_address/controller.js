const addressService = require('./service');
const bcrypt = require('bcryptjs');

exports.getAll = async (id) => {
    let data = await addressService.getAll(id);
    data = data.map(address => {
        address = {
            _id: address._id,
            address: 'số ' + address.number
            + ', đường ' + address.street
            + ', phường ' + address.ward
            + ', quận ' + address.district
            + ', ' + address.city,
            phone_number: address.phone_number,
            default: address.default,
            user_id: address.user_id
        }
        return address;
    });
    return data;
}

exports.getById = async (id) => {
    let result = await addressService.getById(id);
    result = {
        ...result?._doc
    }
    return result;
}

exports.insert = async (data) => {
    const result = await addressService.insert(data);
    return result;
}

exports.update = async (id, data) => {
    const result = await addressService.update(id, data);
    console.log('update address controller: ');
    return result;
}

exports.delete = async(id) => {
    const result = await addressService.delete(id);
    return result;
}

exports.setDefault = async(id) => {
    const result = await addressService.setDefault(id);
    return result;
}

exports.setNonDefault = async(id) => {
    const result = await addressService.setNonDefault(id);
    return result;
}





