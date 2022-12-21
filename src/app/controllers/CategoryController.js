const controller = require('../components/categories/controller');
const pController = require('../components/products/controller');
const fs = require('fs');

class CategoryController {

    // [GET] /
    async index(req, res, next) {
        let user;
        if(req.session.user){
            user = req.session.user
        }
        await controller.getAll()
        .then(categories => {
            res.render('categories', {categories, user});
        })
        .catch(next);
    }

    async create(req, res, next) {
        let user;
        if(req.session.user){
            user = req.session.user
        }
        res.render('category_create', {user});
    }
    // [POST] / 
    async insert(req, res, next) {
        let image = '';
        let {
            body,
            file
        } = req;
        console.log('body: ', body);
        console.log('files: ', file);
        if (file) {
            image = `http://localhost:3000/img/${file.filename}`;
        }
        let data = {
            ...body,
            image: image,
        };
        console.log('body: ', data);
        await controller.insert(data).then(function (result) {
            if (result) {
                res.json({message: 'Thêm danh mục thành công', status: true})
            } else {
                console.log('existed insert');
                res.json({message: 'Tên danh mục đã tồn tại', status: false})
            }
        }).catch(function(error){
            res.json({message: 'Lỗi: ' + error, status: false})
        });
    }

    async one(req, res, next) {
        const {
            id
        } = req.params;
        let user;
        if(req.session.user){
            user = req.session.user
        }
        await controller.getById(id)
        .then(category => {
            res.render('category_edit', {category, user});
        })
        .catch(next);
    }

    async getImage(req, res, next) {
        const {
            id
        } = req.params;
        await controller.getById(id)
        .then(category => {
            res.json(category.image);
        })
        .catch(next);
    }

    async delete(req, res, next) {
        const {
            id
        } = req.params;
        console.log('id category: ', id);
        const c = await controller.getById(id);
        const products = await pController.getAll();
        const inCategory = products.some(product => {
            return product.category_id._id == id;
        });
        console.log('ton tai: ', inCategory);
        if (inCategory) {
            res.json({message: 'Không thể xóa danh mục có chứa sản phẩm', status: false});
        } else {
            await controller.delete(id).then(function () {
                res.json({message: 'Xóa danh mục thành công', status: true});
            }).catch(next);
        }
    }

    async update(req, res, next) {
        let image = '';
        let {
            body,
            file
        } = req;
        const {
            id
        } = req.params;
        if (file) {
            image = `http://localhost:3000/img/${file.filename}`;
        }
        body = {
            ...body,
            image
        };
        await controller.update(id, body).then(function (result) {
            if (result) {
                res.json({message: 'Cập nhật danh mục thành công', status: true})
            } else {
                res.json({message: 'Tên danh mục đã tồn tại', status: false})
            }
        }).catch(function(error){
            res.json({message: 'Lỗi: ' + error, status: false})
        });
    }
}

function deleteImage(image) {
    if (image.length > 0) {
        const url = String(image).slice(String(image).search("image"), String(image).length);
        const path = `./src/public/img/${url}`;
        fs.unlinkSync(path);
    }
}

module.exports = new CategoryController();