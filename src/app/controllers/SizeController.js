const sizeController = require('../components/sizes/controller');

class SizeController {
    // [GET] /
    // hiển thị tất cả size
    async index(req, res, next) {
        let user;
        if(req.session.user){
            user = req.session.user
        }
        await sizeController.getAll()
        .then(sizes => {
            res.render('sizes', {sizes, user});
        })
        .catch(next);
    }

    async create(req, res, next) {
        let user;
        if(req.session.user){
            user = req.session.user
        }
        res.render('size_create', {user});
    }

    async one(req, res, next) {
        const {id} = req.params;
        let user;
        if(req.session.user){
            user = req.session.user
        }
        await sizeController.getById(id)
        .then(size => {
            console.log(size);
            res.render('size_edit', {size, user});
        })
        .catch(next);
    }

    async insert(req, res, next) {
        let {
            body
        } = req; 
        const symbol = body.symbol.toUpperCase();
        body = {
            ...body,
            symbol
        };
        await sizeController.insert(body).then(function(result){
            if(result){
                res.json({message: "Thêm size thành công", status: true});
            } else {
                res.json({message: "Không thể thêm size đã tồn tại", status: false});
            }
        }).catch(function(error){
            res.json('error :', error)
        });
    }

    async update(req, res, next){
        let {
            body
        } = req;
        const { id } = req.params;
        const symbol = body.symbol.toUpperCase();
        body = {
            ...body,
            symbol
        };
        await sizeController.update(id, body).then(function(result){
            if(result){
                res.json({message: "Cập nhật size thành công", status: true});
            } else {
                res.json({message: "Size đã tồn tại", status: false});
            }
        }).catch(error => res.json({message: 'Lỗi ' + error}));
    }

    async delete(req, res, next){
        const { id } = req.params;
        await sizeController.delete(id).then(function(){
            res.redirect('/sizes');
        }).catch(next);
    }
}

module.exports = new SizeController();