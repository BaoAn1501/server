const controller = require('../components/orders/controller');
const orderItemController = require('../components/order_item/controller');
const userController = require('../components/users/controller');
const sizeController = require('../components/sizes/controller');
const productController = require('../components/products/controller');
const addressController = require('../components/user_address/controller');
const reviewController = require('../components/reviews/controller');
const fs = require('fs');
const { enumStatusOrder } = require('../../util/constants');
const { or } = require('ip');

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
            res.render('order_detail', {order, _user, address, list, user});
        });
    }

    async ok(req, res, next) {
        const {id} = req.params;
        await controller.update(id, enumStatusOrder.shipping)
        .then(()=>{
            res.redirect('/orders');
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

    async getAll(req, res, next){
        let orders = await controller.getAll();
        orders = orders.filter(item => {
            return item.status.code == 3;
        })
        res.json(orders);
    }

    async get10DaysAnalysis (req, res, next) {
        let today = new Date();
        today = today.setUTCHours(23,59,59,999);
        let last = today - (6 * 24 * 60 * 60 * 1000);
        last = new Date(last);
        last = last.setUTCHours(0,0,0,0);
        today = new Date(today);
        last = new Date(last);
        let list10Days = [];
        for(var i=0;i <= 7;i++){
            var value =  new Date(today-(i*24 * 60 * 60 * 1000));
            value.setUTCHours(0,0,0,0);
            value = new Date(value);
            var day = value.getDay();
            list10Days.push({date: value, day: convertDay(day),  total: 0});
        }
        const listOrder = await controller.getDay(last, today)
        .then((result) => {
            if(result){
                result = result.map(element => {
                    element = {
                        date: new Date(new Date(element.updatedAt).setUTCHours(0,0,0,0)),
                        total: element.total
                    }
                    return element;
                });
                return result;
            }
        })
        .then((result) => {
            list10Days = list10Days.concat(result);
            const list = list10Days.reduce((acc, element)=>{
                if (element.date in acc) {
                    acc[element.date].total = element.total + acc[element.date].total
                } else {
                    acc[element.date] = element;
                }
                return acc;
            }, {});
            const list1 = Object.values(list);
            res.json(list1.reverse());
        } )
        .catch(error => res.json(error));
    }

    async getToday(req, res, next){
        let today = new Date();
        let endDay = today.setUTCHours(23,59,59,999);
        let startDay = today.setUTCHours(0,0,0,0);
        let orders = await controller.getDay(startDay, endDay);
        res.json(orders);
    }

}

function convertDay(day){
    switch(day){
        case 0: 
            return 'CN';
        case 1: 
            return 'T2';
        case 2: 
            return 'T3';
        case 3: 
            return 'T4';
        case 4: 
            return 'T5';
        case 5: 
            return 'T6';
        case 6: 
            return 'T7';
    }
}

module.exports = new OrderController();