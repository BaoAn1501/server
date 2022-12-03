const sizeController = require('../components/sizes/controller');

class SizeController {
    // [GET] /
    async index(req, res, next) {
        await sizeController.getAll()
        .then(sizes => {
            res.render('sizes', {sizes});
        })
        .catch(next);
    }

    async create(req, res, next) {
        res.render('size_create');
    }

    async one(req, res, next) {
        const {id} = req.params;
        await sizeController.getById(id)
        .then(size => {
            console.log(size);
            res.render('size_edit', {size});
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
                res.redirect('/sizes');
            } else {
                res.json({message: "Không thể thêm size đã tồn tại"});
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
        await sizeController.update(id, body).then(function(){
            res.redirect('/sizes');
        }).catch(next);
    }

    async delete(req, res, next){
        const { id } = req.params;
        await sizeController.delete(id).then(function(){
            res.redirect('/sizes');
        }).catch(next);
    }
}

module.exports = new SizeController();