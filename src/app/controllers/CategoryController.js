const controller = require('../components/categories/controller');
const upload = require('../../middleware/upload');
const fs = require('fs');

class CategoryController {

    // [GET] /
    async index(req, res, next) {
        const result = await controller.getAll();
        res.json(result);
    }

    async create(req, res, next) {
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
        const category = await controller.insert(body);
        if (category == null) {
            res.json({
                message: "Tên loại đã tồn tại"
            });
        } else {
            res.json({
                message: "Thêm loại thành công"
            });
        }
    }

    async one(req, res, next) {
        const {
            id
        } = req.params;
        const category = await controller.getById(id);
        res.json(category);
    }

    async delete(req, res, next) {
        const {
            id
        } = req.params;
        const c = await controller.getById(id);
        const oldImage = c.image;
        if (oldImage.length > 0) {
            deleteImage(id);
        }
        await controller.delete(id).then(function(){
            res.json({message: "Đã xóa loại"});
        }).catch(err => res.json({message: err}));
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
            if (oldImage.length > 0) {
                deleteImage(id);
            }
            image = `http://localhost:3000/img/${file.filename}`;
        } else {
            image = oldImage;
        }

        body = {
            ...body,
            image
        };
        const category = await controller.update(id, body);
        if (category == null) {
            res.json({
                message: "Tên loại đã tồn tại"
            });
        } else {
            res.json({
                message: "Cập nhật loại thành công"
            });
        }
    }
}

async function deleteImage(id) {
    const category = await controller.getById(id);
    const oldImage = category.image;
    const url = String(oldImage).slice(String(oldImage).search("image"), String(oldImage).length);
    const path = `./src/public/img/${url}`;
    fs.unlinkSync(path);
}

module.exports = new CategoryController();