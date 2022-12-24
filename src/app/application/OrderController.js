const orderController = require('../components/orders/controller');
const sizeController = require('../components/sizes/controller');
const productSizeController = require('../components/product_sizes/controller');
const productController = require('../components/products/controller');
const userController = require('../components/users/controller');
const cartController = require('../components/cart_item/controller');
const addressController = require('../components/user_address/controller');
const orderItemController = require('../components/order_item/controller');
const reviewController = require('../components/reviews/controller');
const { enumStatusOrder } = require('../../util/constants');

class OrderController {

    // [GET] /api/products
    async index(req, res, next) {
        const {id} = req.params;
        let orders = await orderController.getAll();
        orders = orders.filter(item => {
            return item.userAddress_id.user_id == id;
        });
        res.json(orders);
    }

    async cancelList (req, res, next) {
        const {id} = req.params;
        let orders = await orderController.getAll();
        if(orders.length>0){
            orders = orders.filter(item => {
                return item.userAddress_id.user_id == id && item.status.name == enumStatusOrder.canceled.name;
            });
            res.json(orders);
        } else {
            res.json(null);
        }
    }

    async shippingList (req, res, next) {
        const {id} = req.params;
        let orders = await orderController.getAll();
        if(orders.length>0){
            orders = orders.filter(item => {
                return item.userAddress_id.user_id == id && item.status.name == enumStatusOrder.shipping.name;
            });
            res.json(orders);
        } else {
            res.json(null);
        }
    }

    async takenList (req, res, next) {
        const {id} = req.params;
        let orders = await orderController.getAll();
        if(orders.length>0){
            orders = orders.filter(item => {
                return item.userAddress_id.user_id == id && item.status.name === enumStatusOrder.taken.name;
            });
            res.json(orders);
        } else {
            res.json(null);
        }
    }

    async pendingList (req, res, next) {
        const {id} = req.params;
        let orders = await orderController.getAll();
        if(orders.length>0){
            orders = orders.filter(item => {
                return item.userAddress_id.user_id == id && String(item.status.name) == String(enumStatusOrder.pending.name);
            });
            res.json(orders);
        } else {
            res.json(null);
        }
    }

    async one(req, res, next) {
        const {
            id, ido
        } = req.params;
        const order = await orderController.getById(ido);
        const user = await userController.getById(order.userAddress_id.user_id);
        const address = await addressController.getById(order.userAddress_id._id);
        const orderItem = await orderItemController.getAll(ido);
        const list = orderItem.map(async (item) => {
            const s = await sizeController.getById(item.productSize_id.size_id);
            const size = s.symbol;
            const p = await productController.getById(item.productSize_id.product_id);
            const image = p.images[0];
            const name = p.name;
            item = {
                image: image,
                name: name,
                size: size,
                price: item.price,
                quantity: item.quantity
            }
            return item;
        })
        Promise.all(list).then((list) => {
            res.json({
                order: order,
                user: user,
                address: address,
                list: list
            })
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
        if(data.total==0){
            res.json({message: 'Không có sản phẩm nào được mua'});
        } else {
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
        
    }

    async cancel(req, res, next) {
        const {id, ido} = req.params;
        await orderController.update(ido, enumStatusOrder.canceled)
        .then(()=>{
            res.json({message: 'Đã hủy đơn hàng'});
        })
        .catch(error => res.json(error));
    }

    async receive(req, res, next) {
        const {id, ido} = req.params;
        let orderItems = await orderItemController.getAll(ido);
        const list = [...orderItems.reduce((map, obj) => map.set(String(obj.productSize_id.product_id), obj), new Map()).values()];
        await orderController.update(ido, enumStatusOrder.taken)
        .then(async (result)=>{
            const address = await addressController.getById(String(result.userAddress_id));
            console.log('address: ', address);
            list = list.map(async item => {
                item = {
                    product_id : item.productSize_id.product_id,
                    user_id: address.user_id,
                    score: 0,
                }
                console.log('item review: ', item);
                await reviewController.insert(item);
            });
            Promise.all(list).then(() => {
                res.json({message: 'Đã thanh toán'});
            })
        })
        .catch(error => res.json(error));
    }

    
}

module.exports = new OrderController();