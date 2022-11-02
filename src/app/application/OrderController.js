const orderController = require('../components/orders/controller');
const sizeController = require('../components/sizes/controller');
const productSizeController = require('../components/product_sizes/controller');
const productController = require('../components/products/controller');

class ProductController {

    // [GET] /api/products
    async index(req, res, next) {
        const products = await controller.getAll();
        res.json(products);
    }

    async create(req, res, next){
        let { body } = req;
        

    }
    
}

module.exports = new ProductController();