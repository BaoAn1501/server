const userController = require('../components/users/controller');
const jwt = require('jsonwebtoken');

class UsersController {
    // [GET] /
    async index(req, res, next) {
        const result = await userController.getAll();
        res.json(result);
    }
}

module.exports = new UsersController();