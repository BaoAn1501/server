const controller = require('../components/categories/controller');
const pController = require('../components/products/controller');
const fs = require('fs');

class CategoryController {

    // [GET] /
    async index(req, res, next) {
        await controller.getAll()
        .then(categories => {
            res.render('categories', {categories});
        })
        .catch(next);
    }

    async create(req, res, next) {
        res.render('category_create');
    }
    // [POST] / 
    async insert(req, res, next) {
        let image = '';
        let {
            body,
            file
        } = req; 
        if (file) {
            image = `http://localhost:3000/img/${file.filename}`;
        }
        body = {
            ...body,
            image
        };
        console.log('body: ', body);
        await controller.insert(body).then(function (result) {
            if (result) {
                res.redirect('/categories');
            } else {
                res.json({message: 'Tên loại đã tồn tại'})
                deleteImage(image);
            }
        }).catch(function(){
            deleteImage(image);
        });
    }

    async one(req, res, next) {
        const {
            id
        } = req.params;
        await controller.getById(id)
        .then(category => {
            res.render('category_edit', {category});
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
            console.log(product.category_id._id);
            return product.category_id._id == id;
        });
        console.log('ton tai: ', inCategory);
        const oldImage = c.image;
        if (inCategory) {
            res.json('Không thể xóa loại có sản phẩm');
        } else {
            await controller.delete(id).then(function () {
                deleteImage(oldImage);
                res.redirect('/categories');
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
        const c = await controller.getById(id);
        const oldImage = c.image;
        if (file) {
            image = `http://localhost:3000/img/${file.filename}`;
        } else {
            image = oldImage;
        }
        body = {
            ...body,
            image
        };
        await controller.update(id, body).then(function (result) {
            if (result) {
                if (file) {
                    deleteImage(oldImage);
                }
                res.redirect('/categories');
            } else {
                if (file) {
                    deleteImage(image);
                }
                res.json({
                    message: "Tên loại đã tồn tại"
                });
            }
        }).catch(function(){
            deleteImage(image);
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