const moment = require('moment'); // require
const orderController = require('../components/orders/controller');
const productController = require('../components/products/controller');
const orderItemsController = require('../components/order_item/controller');
const reviewController = require('../components/reviews/controller');

class AnalysisController {
    async index(req, res, next) {
        res.render('analysis');
    }

    async ratingMonth (req, res, next) {
        const date = new Date();
        console.log('m: ', date.getMonth()+1);
        let begin = new Date(date.getFullYear(), date.getMonth(), 2);
        let end = new Date(date.getFullYear(), date.getMonth()+1, 1);
        begin = begin.setUTCHours(0,0,0,0);
        end = end.setUTCHours(23,59,59,999);
        begin = new Date(begin);
        end = new Date(end);
        const list = await GetRateList(begin, end);
        console.log(list);
        res.json(list);
    }

    async sellDay(req, res, next) {
        const {date} = req.params;
        console.log('date initial: ', date);
        let newDate = new Date(date);
        newDate = newDate.setUTCHours(0,0,0,0);
        newDate = newDate + (24 * 60 * 60 * 1000);
        newDate = new Date(newDate);
        console.log('date after: ', newDate);
        let begin = newDate.setUTCHours(0,0,0,0);
        let end = newDate.setUTCHours(23,59,59,999);
        begin = new Date(begin);
        end = new Date(end);
        console.log('begin: ', begin, ' end: ', end);
        let list = await GetOrderList(begin, end);
        console.log(list);
        list = list.reduce((acc, element)=>{
            if (element.product.name in acc) {
                acc[element.product.name].quantity = element.quantity + acc[element.product.name].quantity
            } else {
                acc[element.product.name] = element;
            }
            return acc;
        }, {});
        let list1 = Object.values(list);
        res.json(list1);
    }

    async get7Days (req, res, next) {
        const td = new Date();
        let today = new Date();
        today = today.setUTCHours(23,59,59,999);
        let last = today - (6 * 24 * 60 * 60 * 1000);
        last = new Date(last);
        last = last.setUTCHours(0,0,0,0);
        today = new Date(today);
        last = new Date(last);
        let list7Day = [];
        for(var i=0;i < 7;i++){
            var value =  new Date(today-(i*24 * 60 * 60 * 1000));
            value.setUTCHours(0,0,0,0);
            value = new Date(value);
            list7Day.push({date: value, total: 0});
        }
        const listOrder = await orderController.getDay(last, today)
        .then((result) => {
            if(result){
                console.log('list order: ', result);
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
            list7Day = list7Day.concat(result);
            const list = list7Day.reduce((acc, element)=>{
                if (element.date in acc) {
                    acc[element.date].total = element.total + acc[element.date].total
                } else {
                    acc[element.date] = element;
                }
                return acc;
            }, {});
            const list1 = Object.values(list);
            console.log('list1: ', list1);
            res.json(list1);
        } )
        .catch(error => res.json(error));
    }
}

async function GetOrderList(begin, end) {
    const list = await orderController.getDay(begin, end)
    .then((result) => {
        if(result){
            let result1 = result.map(async (item) => {
                let data = await orderItemsController.getAll(item._id);
                let promises = data.map(async (item) => {
                    const product = await productController.getById(item.productSize_id.product_id);
                    item = {
                        _id: item._id,
                        product: product,
                        quantity: item.quantity
                    }
                    return item;
                });
                return Promise.all(promises);
            })
            
            const _result = Promise.all(result1).then((result) => {
                result = result.flat(1);
                console.log(result);
                return result;
            })
            return _result;
        }
    })
    return list;
}

async function GetRateList(begin, end){
    let list = await reviewController.getInDay(begin, end)
    .then((result) => {
        if(result){
            result = result.map(async(item) => {
                console.log('id product: ', item._id);
                const product = await productController.getById(item.product_id);
                item.product_id = product;
                return item;
            })
            return result;
        }
    })
    .then(result => {
        console.log('res1: ', result);
        const _result = Promise.all(result).then(result => {
            let count = {};
            let result1 = result.reduce(function (r, o) {
                if (!count[o.product_id.name]) {
                    count[o.product_id.name] = { sum: +o.score, data: o };
                    count[o.product_id.name].data.count = 1;
                    r.push(count[o.product_id.name].data);
                } else {
                    count[o.product_id.name].sum += +o.score;
                    count[o.product_id.name].data.score = count[o.product_id.name].sum / ++count[o.product_id.name].data.count;
                }
                return r;
            }, []);
            result1 = result1.slice(0, 10).sort((a, b) => {
                if (a.score < b.score) {
                    return -1;
                } else {
                    return 1;
                }
            });
            return result1;
        })
        return _result;
    })
    return list;
}
  
module.exports = new AnalysisController();