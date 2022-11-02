const controller = require('../components/users/controller');
const addressController = require('../components/user_address/controller')
class UserController {
    // [GET] /api/users/:id
    async one(req, res, next) {
        const { id } = req.params;
        console.log('id params: ', id);
        await controller.getById(id)
        .then(function(result){
            if(result){
                console.log('user: ', result);
                res.json(result);
            } else {
                console.log('none user');
                res.json({});
            }
        }).catch(error => {
            res.json(error);
        });
    }
    async change(req, res, next) {
        const { id } = req.params;
        const { full_name, avatar } = req.body;
        await controller.update(id, full_name, avatar)
        .then(function(result){
            if(result){
                res.json('Đổi thông tin thành công');
            }
        }).catch(error => {
            res.json('Lỗi: ', error)
        });
    }

    // [POST] /api/users/:id/address/insert
    async addAddress (req, res, next) {
        const {id} = req.params;
        let { body } = req;
        body = {
            user_id: id,
            ...body
        }
        const result = await addressController.insert(body)
        if(result){
            console.log(result);
            res.json(result);
        } else {
            console.log('error');
            res.json({});
        }
    }

    async allAddress (req, res, next) {
        const {id} = req.params;
        console.log('id all address: ', id);
        const result = await addressController.getAll(id);
        if(result){
            console.log('all address result: ', result);
            res.json(result)
        } else {
            console.log('all address result none');
            res.json({});
        }
    }
    
}

module.exports = new UserController();