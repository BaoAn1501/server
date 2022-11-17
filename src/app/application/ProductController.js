const controller = require('../components/products/controller');
const categoryController = require('../components/categories/controller');
const sizeController = require('../components/sizes/controller');
const productSizeController = require('../components/product_sizes/controller');
const cartController = require('../components/cart_item/controller');

class ProductController {

    // [GET] /api/products
    async index(req, res, next) {
        let products = await controller.getAll();
        products = products.map(async item => {
            console.log('_id: ', item._id);
            const _price = await findMin(item._id);
            console.log('price min: ', _price);
            item.price = _price;
            console.log('item after: ', item);
            return item;
        });
        Promise.all(products).then(result => {
            result = result.filter(item => {
                return item.price > 0;
            })
            res.json(result);
        })
    }

    // [GET] /api/products/:id
    async one(req, res, next) {
        const {id} = req.params;
        let sizes = await productSizeController.getAll(id);
        console.log('sizes: ', sizes);
        sizes = sizes.filter(item => {
            return item.price > 0;
        });
        // .entries().next().value;
        res.json(sizes);
    }
    
    // [GET] /api/products/:id/:slug
    async oneSlug(req, res, next) {
        console.log('run product one slug');
        const {
            id,
            slug
        } = req.params;
        console.log('id: ', id, 'slug: ', slug.toUpperCase());
        const size = await sizeController.getBySlug(slug.toUpperCase());
        const size_id = String(size._id);
        console.log('size_id: ', size_id);
        const productSize = await productSizeController.getOne(id, size_id);
        res.json(productSize);
    }

    async saveCart (req, res, next) {
        let { body } = req;
        body = {
            ...body
        }
        const newCart = await cartController.insert(body)
        .then(() => {
            res.json({message: 'Sản phẩm đã được thêm vào giỏ hàng'});
        })
        .catch(error => res.json(error));
    }

    async updateCart (req, res, next) {
        
    }
}

const findMin = async (id) => {
    const products = await productSizeController.getAll(id);
    // console.log('all productSize: ', products);
    const list = products.filter(item => {
        return Number(item.price) > 0;
    });
    // console.log('list > 0: ', list);
    // console.log('list has price > 0 length: ', list.length);
    let t;
    if(list.length>0){
        // console.log('find min running');
        t = list.reduce(function(accumulator, element){
            return (accumulator.price < element.price ) ? accumulator : element;
        });
        return t.price;
    } else {
        return 0;
    }
}

module.exports = new ProductController();