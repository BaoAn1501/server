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
        const { full_name } = req.body;
        await controller.update(id, full_name)
        .then(function(result){
            if(result){
                res.json('Đổi tên người dùng thành công');
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

    async getAddress (req, res, next) {
        const {id, idAds} = req.params;
        console.log('id user: ', id, 'id address: ', idAds);
        const result = await addressController.getById(idAds);
        if(result){
            console.log('find address result: ', result);
            res.json(result)
        } else {
            console.log('find address result none');
            res.json({});
        }
    }

    async updateAddress (req, res, next) {
        const {id, idAds} = req.params;
        console.log('id user: ', id, 'id address: ', idAds);
        let { body } = req;
        body = {
            user_id: id,
            ...body
        }
        const result = await addressController.update(idAds, body);
        if(result){
            console.log('find address result: ', result);
            res.json(result)
        } else {
            console.log('find address result none');
            res.json({});
        }
    }

    async deleteAddress (req, res, next) {
        const {id, idAds} = req.params;
        console.log('id user delete: ', id, 'id address: ', idAds);
        await addressController.delete(idAds)
        .then(result => {
            res.json(result);
        })
        .catch(error => {
            res.json(error);
        })
    }

    async setDefault(req, res, next) {
        const {id, idAds} = req.params;
        console.log('id user setDefault: ', id, 'id address: ', idAds);
        await addressController.setDefault(idAds)
        .then(async result => {
            if(result){
                const allAddress = await addressController.getAll(id);
                const findIdOldDefault = allAddress.map(item => {
                    console.log('id item: ', item._id, ' default: ', item.default, )
                    return (item.default === true && item._id != idAds) ? String(item._id) : null;
                })
                console.log('id of old default address: ', findIdOldDefault)
                if(findIdOldDefault){
                    console.log(findIdOldDefault);
                    await addressController.setNonDefault(findIdOldDefault)
                    .then(result => {
                        if(result){
                            res.json({message: 'Đổi địa chỉ mặc định thành công'});
                        }
                    })
                    .catch(error => res.json(error));
                }
            }
        })
    }
    
}

module.exports = new UserController();