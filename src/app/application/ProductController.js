const controller = require('../components/products/controller');
const categoryController = require('../components/categories/controller');
const sizeController = require('../components/sizes/controller');
const productSizeController = require('../components/product_sizes/controller');

class ProductController {

    // [GET] /api/products
    async index(req, res, next) {
        const products = await controller.getAll();
        res.json(products);
    }

    // [GET] /api/products/:id
    async one(req, res, next) {
        const {
            id, slug
        } = req.params;
        const ps = await productSizeController.getAll(id);
        const products = ps.filter(item => {
            return item.price > 0;
        });
        res.json(products);
    }
    // [GET] /api/products/:id/:slug
    async oneSlug(req, res, next) {
        const {
            id,
            slug
        } = req.params;
        console.log('id: ', id, 'slug: ', slug);
        const size = await sizeController.getBySlug(slug);
        const size_id = String(size._id);
        console.log('size_id: ', size_id);
        const productSize = await productSizeController.getOne(id, size_id);
        res.json(productSize);
    }
    

    
}

module.exports = new ProductController();