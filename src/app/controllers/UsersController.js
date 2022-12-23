const userController = require('../components/users/controller');
const adminController = require('../components/admin/controller');
const jwt = require('jsonwebtoken');

class UsersController {
    // [GET] /
    async index(req, res, next) {
        let user, users;
        if(req.session.user){
            user = req.session.user
        }
        console.log('user: ', user.email);
        let result = await adminController.getAll();
        if(user.email != "admin@gmail.com"){
            console.log('false');
            users = result.filter(item => {
                return item.email != 'admin@gmail.com' && item.email != user.email ;
            })
        } else {
            console.log('true');
            users = result.filter(item => {
                return item.email != user.email ;
            })
        }
        console.log('users list: ', users);
        res.render('managers', {users, user});
    }

    async registerView(req, res, next) {
        let user;
        if(req.session.user){
            user = req.session.user
        }
        res.render('register', {user});
    }

    async getCurrentUser(req, res, next){
        let user;
        if(req.session.user){
            user = req.session.user
        }
        res.json(user);
    }

    async deleteUser(req, res, next) {
        const {id} = req.params;
        await adminController.delete(id).then(() => {
            res.redirect('/users');
        });
    }
}

module.exports = new UsersController();