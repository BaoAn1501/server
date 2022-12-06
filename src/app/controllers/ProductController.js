const controller = require('../components/products/controller');
const categoryController = require('../components/categories/controller');
const sizeController = require('../components/sizes/controller');
const productSizeController = require('../components/product_sizes/controller');
const fs = require('fs');
const { enumStatusProduct } = require('../../util/constants');

class ProductController {
    // [GET] /
    async index(req, res, next) {
        const products = await controller.getAllWithDeleted();
        res.render('products', {products});
    }

    async create(req, res, next){
        const categories = await categoryController.getAll();
        res.render('product_insert', {categories});
    }

    async insert(req, res, next) {
        let image1 = '',
            image2 = '',
            image3 = '';
        let {
            body,
        } = req;
        image1 = uploadNewImage(req.files.image1);
        image2 = uploadNewImage(req.files.image2);
        image3 = uploadNewImage(req.files.image3);
        body = {
            ...body,
            image1,
            image2,
            image3
        };
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
                res.redirect('/products');
            } else {
                res.json({
                    message: "Thêm sản phẩm thất bại"
                });
                removeImageFromPath(image1);
                removeImageFromPath(image2);
                removeImageFromPath(image3);
            }
        });
    }

    async one(req, res, next) {
        const {
            id
        } = req.params;
        const product = await controller.getById(id);
        const categories = await categoryController.getAll();
        res.render('product_edit', { categories: categories, product: product });
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
        let image1 = '',
            image2 = '',
            image3 = '';
        const {
            id
        } = req.params;
        let {
            body,
        } = req;
        const product = await controller.getById(id);
        const oldImage1 = product.image1;
        const oldImage2 = product.image2;
        const oldImage3 = product.image3;
        // new image if upload
        image1 = hasUploadFile(req.files.image1, oldImage1);
        image2 = hasUploadFile(req.files.image2, oldImage2);
        image3 = hasUploadFile(req.files.image3, oldImage3);
        body = {
            ...body,
            image1,
            image2,
            image3
        };
        await controller.update(id, body).then(function(result){
            if (result) {
                handleImageWhenSuccess(req.files.image1, oldImage1);
                handleImageWhenSuccess(req.files.image2, oldImage2);
                handleImageWhenSuccess(req.files.image3, oldImage3);
                res.redirect('/products');
            }
        }).catch(function(error){
            if(error){
                handleImageWhenFail(req.files.image1, image1);
                handleImageWhenFail(req.files.image2, image2);
                handleImageWhenFail(req.files.image3, image3);
                res.json({
                    message: "Cập nhật sản phẩm thất bại"
                });
            }
        });
    }
}

function removeImageFromPath(image) {
    if (image.length > 0) {
        const url = String(image).slice(String(image).search("image"), String(image).length);
        const path = `./src/public/img/${url}`;
        fs.unlinkSync(path);
    }
}

function hasUploadFile(file, oldImage){
    let imgUrl = '';
    if(file){
        imgUrl = `http://localhost:3000/img/${file[0].filename}`
    } else {
        imgUrl = oldImage;
    }
    return imgUrl;
}

function uploadNewImage(image){
    let imgUrl = '';
    if(image){
        imgUrl = `http://localhost:3000/img/${image[0].filename}`
    }
    return imgUrl;
}

function handleImageWhenSuccess(file, oldImage){
    if(file){
        removeImageFromPath(oldImage);
    }
}

function handleImageWhenFail(file, image){
    if(file){
        removeImageFromPath(image);
    }
}

module.exports = new ProductController();