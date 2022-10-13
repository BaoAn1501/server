const controller = require('../components/products/controller');

class ProductController {

    // [GET] /
    async index(req, res, next) {
        const result = await controller.getAll();
        res.json(result);
    }

    async create(req, res, next) {
        let {
            body
        } = req;
        body = {
            ...body
        };
        const product = await controller.insert(body);
        res.json(product);
    }

    async one(req, res, next) {
        const {
            id
        } = req.params;
        const product = await controller.getById(id);
        res.json(product);
    }

    async delete(req, res, next) {
        const {
            id
        } = req.params;
        const d = await controller.delete(id);
        res.json(d);
    }

    async update(req, res, next) {
        let {
            params,
            body
        } = req;
        body = {
            ...body
        };
        const u = await controller.update(params.id, body);
        res.json(u);
    }
}

module.exports = new ProductController();