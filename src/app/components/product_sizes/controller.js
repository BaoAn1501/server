const productSizeService = require('./service');

exports.getAll = async (id) => {
    let data = await productSizeService.getAll(id);
    data = data.map(item => {
        item = {
            _id: item._id,
            name: item.product_id.name,
            description: item.product_id.description,
            images: item.product_id.images,
            status: item.product_id.status,
            rating: item.product_id.rating,
            size_symbol: item.size_id.symbol,
            size: item.size_id.value,
            price: item.price
        }
        return item;
    });
    return data;
}

// exports.getAllTrue = async (id) => {
//     let data = await productSizeService.getAll(id);
//     data = data.filter(item => {
//         item = {
//             _id: item._id,
//             name: item.product_id.name,
//             image1: item.product_id.image1,
//             image2: item.product_id.image2,
//             image3: item.product_id.image3,
//             status: item.product_id.status,
//             rating: item.product_id.rating,
//             size_symbol: item.size_id.symbol,
//             size: item.size_id.value,
//             price: item.price
//         }
//         return item;
//     });
//     return data;
// }

exports.getOne = async (id, size) => {
    let item = await productSizeService.getOne(id, size);
    item = {
        _id: item._id,
        name: item.product_id.name,
        description: item.product_id.description,
        images: item.product_id.images,
        status: item.product_id.status,
        rating: item.product_id.rating,
        size_symbol: item.size_id.symbol,
        size: item.size_id.value,
        price: item.price
    }
    return item;
}

exports.getById = async (id) => {
    let item = await productSizeService.getById(id);
    item = {
       ...item?._doc
    }
    return item;
}


exports.insert = async (body) => {
    return await productSizeService.insert(body);
}

exports.update = async (id, size, price) => {
    return await productSizeService.update(id, size, price);
}