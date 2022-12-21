const controller = require('../components/products/controller');
const categoryController = require('../components/categories/controller');
const sizeController = require('../components/sizes/controller');
const productSizeController = require('../components/product_sizes/controller');
const fs = require('fs');
const { enumStatusProduct } = require('../../util/constants');

class ProductController {
    // [GET] /
    async index(req, res, next) {
        let user;
        if(req.session.user){
            user = req.session.user
        }
        const products = await controller.getAllWithDeleted();
        res.render('products', {products, user});
    }

    async create(req, res, next){
        let user;
        if(req.session.user){
            user = req.session.user
        }
        const categories = await categoryController.getAll();
        res.render('product_insert', {categories, user});
    }

    async insert(req, res, next) {
        let images = [];
        let {
            body,
            files
        } = req;
        console.log('body: ', body);
        console.log('files: ', files);
        if(files){
            for(var i=0;i<files.length; i++){
                images.push(`http://localhost:3000/img/${files[i].filename}`);
            }
        }
        body = {
            ...body,
            images: images
        };
        let user;
        if(req.session.user){
            user = req.session.user
        }
        await controller.insert(body).then(async function(result){
            if(result){
                const sizes = await sizeController.getAll();
                sizes.map(async size => {
                    let object = {
                        size_id: size._id,
                        product_id: result._id,
                        price: 0
                    }
                    await productSizeController.insert(object);    
                })
                res.json({
                    message: "Thêm sản phẩm thành công",
                    status: true,
                })
            } else {
                res.json({
                    message: "Tên sản phẩm này đã có. Vui lòng nhập tên khác",
                    status: false,
                });
            }
        }).catch(error => res.json({message: 'Lỗi' + error}));
    }

    async one(req, res, next) {
        const {
            id
        } = req.params;
        let user;
        if(req.session.user){
            user = req.session.user
        }
        const product = await controller.getById(id);
        const categories = await categoryController.getAll();
        res.render('product_edit', { categories: categories, product: product, user });
    }

    async getCategory(req, res, next) {
        const {
            id
        } = req.params;
        let user;
        const product = await controller.getById(id);
        if(product){
            res.json(product.category_id);
        }
    }

    async getImages(req, res, next) {
        const {
            id
        } = req.params;
        await controller.getById(id)
        .then(product => {
            res.json(product.images);
        })
        .catch(next);
    }

    async delete(req, res, next) {
        const {
            id
        } = req.params;
        const p = await controller.getById(id);
        await controller.delete(id).then(async () => {
            await controller.change(id, enumStatusProduct.deleted)
            .then(()=>{
                res.redirect('/products');
            })
            .catch(error => res.json(error));
        }).catch(error => res.json({
            message: String(error)
        }));
    }

    async restore(req, res, next) {
        const {
            id
        } = req.params;
        const p = await controller.getById(id);
        await controller.restore(id).then(async () => {
            await controller.change(id, enumStatusProduct.selling)
            .then(()=>{
                res.redirect('/products');
            })
            .catch(error => res.json(error));
        }).catch(error => res.json({
            message: String(error)
        }));
    }

    async sellout(req, res, next) {
        const {
            id
        } = req.params;
        await controller.change(id, enumStatusProduct.outOfStock)
        .then(()=>{
            res.redirect('/products');
        })
        .catch(error => res.json(error));
    }

    async selling(req, res, next) {
        const {
            id
        } = req.params;
        await controller.change(id, enumStatusProduct.selling)
        .then(()=>{
            res.redirect('/products');
        })
        .catch(error => res.json(error));
    }

    async update(req, res, next) {
        let images = [];
        const {
            id
        } = req.params;
        let {
            body,
            files
        } = req;
        if(files){
            for(var i=0;i<files.length; i++){
                images.push(`http://localhost:3000/img/${files[i].filename}`);
            }
        }
        body = {
            ...body,
            images: images
        };
        await controller.update(id, body).then(function(result){
            if (result) {
                res.json({
                    message: "Cập nhật sản phẩm thành công",
                    status: true,
                })
            } else {
                res.json({
                    message: "Tên sản phẩm đã tồn tại. Vui lòng đổi tên khác",
                    status: false,
                })
            }
        }).catch(error => res.json({message: 'Lỗi' + error}));
    }
}

// function removeImageFromPath(image) {
//     if (image.length > 0) {
//         const url = String(image).slice(String(image).search("image"), String(image).length);
//         const path = `./src/public/img/${url}`;
//         fs.unlinkSync(path);
//     }
// }

module.exports = new ProductController();