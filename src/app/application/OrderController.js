const orderController = require('../components/orders/controller');
const sizeController = require('../components/sizes/controller');
const productSizeController = require('../components/product_sizes/controller');
const productController = require('../components/products/controller');
const cartController = require('../components/cart_item/controller');
const orderItemController = require('../components/order_item/controller');
const reviewController = require('../components/reviews/controller');
const { enumStatusOrder } = require('../../util/constants');

class OrderController {

    // [GET] /api/products
    async index(req, res, next) {
        const {id} = req.params;
        let orders = await orderController.getAll();
        orders = orders.filter(item => {
            return String(item.userAddress_id.user_id) === String(id);
        });
        res.json(orders);
    }

    async cancelList (req, res, next) {
        const {id} = req.params;
        let orders = await orderController.getAll();
        orders = orders.filter(item => {
            return String(item.userAddress_id.user_id) === String(id) && item.status.name == enumStatusOrder.canceled.name;
        });
        res.json(orders);
    }

    async successList (req, res, next) {
        const {id} = req.params;
        let orders = await orderController.getAll();
        console.log('run filter success');
        orders = orders.filter(item => {
            return String(item.userAddress_id.user_id) === String(id) && item.status.name === enumStatusOrder.processed.name;
        });
        res.json(orders);
    }

    async pendingList (req, res, next) {
        const {id} = req.params;
        let orders = await orderController.getAll();
        orders = orders.filter(item => {
            return String(item.userAddress_id.user_id) === String(id) && item.status.name == enumStatusOrder.pending.name;
        });
        res.json(orders);
    }

    async one(req, res, next) {
        const {id, ido} = req.params;
        await orderController.getById(ido)
        .then((result)=>{
            res.json(result);
        })
        .catch(error => res.json(error));
    }

    async create(req, res, next){
        const {id} = req.params;
        let {body} = req;
        const data = {
            userAddress_id: body.address._id,
            payment_id: body.payment_id,
            status: enumStatusOrder.pending,
            total: body.total,
        }
        console.log('data checkout: ', data);
        console.log('carts: ', body.carts);
        await orderController.insert(data)
        .then(async result => {
            if(result){
                console.log('order create: ', result);
                const result1 = body.carts.map(async item => {
                    const orderDetail = {
                        productSize_id: item.productSize_id,
                        order_id: result._id,
                        quantity: item.quantity,
                        price: item.productSize_id.price,
                    }
                    console.log('order item: ', orderDetail);
                    await orderItemController.insert(orderDetail);
                });
                Promise.all(result1).then(async() => {
                    await cartController.deleteAll(body.carts[0].user_id._id)
                    .then(() => res.json({message: 'Thanh toán thành công'}))
                    .catch(error => res.json(error));
                  });
            }
        })
        .catch();
    }

    async cancel(req, res, next) {
        const {id, ido} = req.params;
        await orderController.update(ido, enumStatusOrder.canceled)
        .then(()=>{
            res.json({message: 'Đã hủy đơn hàng'});
        })
        .catch(error => res.json(error));
    }

    
}

module.exports = new OrderController();