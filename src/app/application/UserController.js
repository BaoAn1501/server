const controller = require('../components/users/controller');
const addressController = require('../components/user_address/controller');
const searchController = require('../components/search_key/controller');
const userSchema = require('../components/users/model');
const tokenSchema = require('../components/users/token');
const sendEmail = require('../../util/sendEmail');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const token = require('../components/users/token');

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
    async changeName(req, res, next) {
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

    async changePass(req, res, next) {
        const { id } = req.params;
        const { password, newPassword } = req.body;
        const user = await controller.changePass(id, password, newPassword);
        if(user==1){
            res.json({message: 'Mật khẩu hiện tại không đúng', status: false});
        } else {
            res.json({message: 'Đổi mật khẩu thành công', status: true});
        }
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

    async getDefaultAddress (req, res, next) {
        const {id} = req.params;
        const allAddress = await addressController.getAll(id);
        const _default = await addressController.getDefault(id);
        const firstAddress = allAddress[0];
        if(allAddress.length>0){
            if(_default){
                res.json(_default);
            } else {
                res.json(firstAddress);
            }
        } else {
            res.json({});
        }
    }

    async saveSearch (req, res, next) {
        const {id} = req.params;
        // req.query.text
        const model = {
            user_id: id,
            value: req.query.text }
        const all = await searchController.show(id);
        const result = all.some(item => {
            return String(item.value) === String(model.value);
        });
        if(!result){
            const result1 = await searchController.insert(model);
            res.json({message: 'create new key'});
        } else {
            res.json({message: 'key existed'});
        }
        
    }

    async deleteSearch (req, res, next) {
        const {id, _id} = req.params;
        await searchController.delete(_id);
    }

    async showSearch (req, res, next) {
        const {id} = req.params;
        await searchController.show(id)
        .then(result => {
            res.json(result);
        })
        .catch(error => res.json(error));
    }

    async logout(req, res, next){
        req.session.destroy(function(error){
            res.json(error)
        });
    }

    async resetPassword(req, res, next){
        try {
            const {email} = req.body;
            console.log('email: ', email);
            const user = await userSchema.findOne({ email: email });
            if (!user)
                return res.json({message: 'Email không tồn tại', status: false});
    
            let token = await tokenSchema.findOne({ userId: user._id });
            console.log('token: ', token);
            if (!token) {
                token = await new tokenSchema({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex"),
                }).save();
            }
            const link = `http://localhost:3000/password/reset/${user.email}?token=${token.token}`;
            await sendEmail(user.email, "Password reset", link);
    
            res.json({message: "Liên kết đặt lại mật khẩu được gửi đến tài khoản email của bạn", status: true});
        } catch (error) {
            res.json({message: "An error occured" + error});
            console.log(error);
        }
    }

    async showResetForm (req, res, next) {
        if (!req.params.email || !req.query.token) {
            console.log('redirect');
            res.redirect('/password/reset')
        } else {
            console.log('render');
            res.render('reset_password', { email: req.params.email, token: req.query.token})
        }
    }

    async getToken(req, res, next){
        try {
            const user = await userSchema.findOne({email: req.params.email});
            console.log(user);
            if (!user) {
                res.json({message: 'Liên kết không hợp lệ hoặc hết hạn - not email', status: false})
            }
            let token = req.query.token;
            if (!token){
                res.json({message: 'Liên kết không hợp lệ hoặc hết hạn - not token', status: false})
            } 
            const _token = await tokenSchema.findOne({token: token});
            let pass = req.body.password;
            user.password = await bcrypt.hash(pass, await bcrypt.genSalt(10));
            await user.save();
            await _token.delete();
            res.json({message: 'Đổi mật khẩu thành công', status: true})
        } catch (error) {
            res.send("An error occured");
            console.log(error);
        }
    }

    

    
    
    
}

module.exports = new UserController();