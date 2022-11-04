const controller = require('../components/categories/controller');
const pController = require('../components/products/controller');
const fs = require('fs');

class CategoryController {

    // [GET] /api/categories
    async index(req, res, next) {
        console.log('run categories all');
        await controller.getAll()
        .then(categories => {
            console.log(categories, 'categories in controller$');
            res.json(categories);
        })
        .catch(error => res.json(error));
    }
    // [GET] /api/categories/:id
    async one(req, res, next) {
        console.log('run category one');
        const { id } = req.params;
        const products = await pController.getAll();
        const category = products.filter(item => {
            return String(item.category_id._id) === id;
        })
        res.json(category);
    }
}

module.exports = new CategoryController();