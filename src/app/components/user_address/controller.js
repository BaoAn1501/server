const addressService = require('./service');
const bcrypt = require('bcryptjs');

exports.getAll = async (id) => {
    let data = await addressService.getAll(id);
    data = data.map(address => {
        address = {
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

exports.insert = async (data) => {
    const result = await addressService.insert(data);
    return result;
}



