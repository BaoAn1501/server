const controller = require('../components/orders/controller');
const orderItemController = require('../components/order_item/controller');
const userController = require('../components/users/controller');
const sizeController = require('../components/sizes/controller');
const productController = require('../components/products/controller');
const addressController = require('../components/user_address/controller');
const reviewController = require('../components/reviews/controller');
const fs = require('fs');
const { enumStatusOrder } = require('../../util/constants');

class OrderController {

    // [GET] /
    async index(req, res, next) {
        let user;
        if(req.session.user){
            user = req.session.user
        }
        const orders = await controller.getAll();
        res.render('orders', {orders, user});
    }

    async one(req, res, next) {
        const {
            id
        } = req.params;
        let user;
        if(req.session.user){
            user = req.session.user
        }
        const order = await controller.getById(id);
        const _user = await userController.getById(order.userAddress_id.user_id);
        const address = await addressController.getById(order.userAddress_id._id);
        const orderItem = await orderItemController.getAll(id);
        const list = orderItem.map(async (item) => {
            const s = await sizeController.getById(item.productSize_id.size_id);
            console.log('size: ',s);
            const size = s.symbol;
            const p = await productController.getById(item.productSize_id.product_id);
            const image = p.image1;
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
            res.render('order_detail', {order, _user, address, list, user});
        });
    }

    async ok(req, res, next) {
        const {id} = req.params;
        let orderItems = await orderItemController.getAll(id);
        orderItems = orderItems.map(item => String(item.productSize_id.product_id));
        let list = [];
        list = orderItems.filter((item) => {
            return list.includes(item) ? '' : list.push(item)
        });
        await controller.update(id, enumStatusOrder.processed)
        .then(async (result)=>{
            const address = await addressController.getById(String(result.userAddress_id));
            list = list.map(async item => {
                item = {
                    product_id : item,
                    user_id: address.user_id,
                    score: 0,
                }
                console.log('item review: ', item);
                await reviewController.insert(item);
            });
            Promise.all(list).then(() => {
                res.redirect('/orders');
            })
        })
        .catch(error => res.json(error));
    }

    async cancel(req, res, next) {
        const {id} = req.params;
        await controller.update(id, enumStatusOrder.canceled)
        .then(()=>{
            res.redirect('/orders');
        })
        .catch(error => res.json(error));
    }

}

module.exports = new OrderController();