const addressService = require('./service');
const bcrypt = require('bcryptjs');

exports.getAll = async (id) => {
    let data = await addressService.getAll(id);
    data = data.map(address => {
        address = {
            _id: address._id,
            address: address.number + ', ' 
            + address.street + ', ' 
            + address.ward + ', '
            + address.district + ', '
            + address.city,
            phone_number: address.phone_number,
            default: address.default,
            user_id: address.user_id
        }
        return address;
    });
    console.log('all address controller: ', data);
    return data;
}

exports.getById = async (id) => {
    const result = await addressService.getById(id);
    address = {
        _id: result._id,
        address: result.number + ', ' 
        + result.street + ', ' 
        + result.ward + ', '
        + result.district + ', '
        + result.city,
        phone_number: result.phone_number,
        default: result.default,
        user_id: result.user_id
    }
    return address;
}

exports.insert = async (data) => {
    const result = await addressService.insert(data);
    return result;
}

exports.update = async (id, data) => {
    const result = await addressService.update(id, data);
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





