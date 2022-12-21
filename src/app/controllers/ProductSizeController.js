const controller = require('../components/product_sizes/controller');
const sizeController = require('../components/sizes/controller');
const productController = require('../components/products/controller');

class ProductSizeController {
    // [GET] /
    async index(req, res, next) {
        const {
            id
        } = req.params;
        let user;
        if(req.session.user){
            user = req.session.user
        }
        const productSizes = await controller.getAll(id);
        console.log('list: ', productSizes);
        const name = productSizes[0].name;
        res.render('product_size_edit', {
            id,
            name,
            productSizes,
            user
        });
    }

    async sizes(req, res, next) {
        const {
            id
        } = req.params;
        const all = await controller.getAll(id);
        const productSizes = all.filter(item => {
            return item.price > 0
        })
        res.json(productSizes);
    }

    async update(req, res, next) {
        const {
            id
        } = req.params;
        let {
            body
        } = req;
        const sizes = await sizeController.getAll();
        const sizeList = sizes.map(item => {
            return String(item._id);
        });
        console.log(sizeList, 'sizeList');
        let priceList = {
            ...body
        }
        const result = sizeList.forEach(async (num1, index) => {
            const num2 = priceList.price[index];
            console.log(id, num1, num2, 'object update');
            await controller.update(id, num1, num2);
        });
        console.log('result', result);
        res.redirect('/products');
    }


}

module.exports = new ProductSizeController();