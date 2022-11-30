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
                res.json({message: 'Đổi tên người dùng thành công'});
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
            number: body.body.number,
            street: body.body.street,
            ward: body.body.ward,
            district: body.body.district,
            city: body.body.city,
            phone_number: body.body.phone_number,
            default: body.body.default
        }
        console.log('body: ', body);
        await addressController.insert(body)
        .then(async (result) => {
            if(result.default == true) {
                console.log('id cur: ', result._id);
                await addressController.getAll(id).then(
                    async (result1) => {
                        result1 = result1.filter(item => {
                            return String(item._id) !== String(result._id) && item.default === true; 
                        })
                        console.log(result1);
                        if(result1.length>0){
                            await addressController.setNonDefault(result1[0]._id)
                            .then(res.json({message: "Thêm địa chỉ thành công"}));
                        }
                    }
                    
                );
            }
        })
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
        let { body } = req;
        body = {
            user_id: id,
            number: body.body.number,
            street: body.body.street,
            ward: body.body.ward,
            district: body.body.district,
            city: body.body.city,
            phone_number: body.body.phone_number,
            default: body.body.default
        }
        console.log('update address id user: ', id, 'id address: ', idAds, 'body: ', body);
        await addressController.update(idAds, body)
        .then(async (result) => {
            console.log('result after update address: ', result);
            if(result.default == true) {
                console.log('id cur: ', result._id);
                await addressController.getAll(id).then(
                    async (result1) => {
                        result1 = result1.filter(item => {
                            return String(item._id) !== String(result._id) && item.default === true; 
                        })
                        console.log(result1);
                        if(result1.length>0){
                            await addressController.setNonDefault(result1[0]._id)
                            .then(res.json({message: "Cập nhật địa chỉ thành công"}));
                        }
                    }
                );
            } else {
                res.json({message: "Cập nhật địa chỉ thành công"})
            }
        })
        .catch(error => res.json(error));
    }

    async deleteAddress (req, res, next) {
        const {id, idAds} = req.params;
        console.log('id user delete: ', id, 'id address: ', idAds);
        await addressController.delete(idAds)
        .then(async (result) => {
            if(result.default == true) {
                await addressController.getAll(id).then(
                    async (result1) => {
                        if(result1.length>0){
                            const address = {
                                user_id: id,
                                number: result1[0].number,
                                street: result1[0].street,
                                ward: result1[0].ward,
                                district: result1[0].district,
                                city: result1[0].city,
                                phone_number: result1[0].phone_number,
                                default: true
                            }
                            await addressController.update(result1[0]._id, address)
                            .then(()=>{
                                res.json({message: 'Xóa địa chỉ thành công'});
                            })
                            .catch(error => res.json(error));
                        }
                    }
                    
                );
            }
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