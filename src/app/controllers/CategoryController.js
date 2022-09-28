const controller = require('../components/categories/controller');

class CategoryController {

    
    // [GET] /
    async index(req, res, next) {
        const categories = await controller.getAll();
        res.send(categories);
    }

    async create(req, res, next) {
        let {body} = 
        await categoryController.insert(body);
        res.send('create');
    }
}

module.exports = new CategoryController();
