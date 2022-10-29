const controller = require('../components/categories/controller');
const pController = require('../components/products/controller');
const fs = require('fs');

class CategoryController {

    // [GET] /api/categories
    async index(req, res, next) {
        await controller.getAll()
        .then(categories => {
            res.json(categories);
        })
        .catch(next);
    }
    // [GET] /api/categories/:id
    async one(req, res, next) {
        const { id } = req.params;
        const products = await pController.getAll();
        console.log('all products: ', products);
        const category = products.filter(item => {
            return item.category_id._id == id;
        })
        res.json(category);
    }
}

module.exports = new CategoryController();