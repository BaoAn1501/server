const moment = require('moment'); // require
const orderController = require('../components/orders/controller');
const orderItemsController = require('../components/order_item/controller');
const { update } = require('./CategoryController');

class AnalysisController {
    async index(req, res, next) {

        res.render('analysis');
    }

    async getThisWeek (req, res, next) {
        const td = new Date();
        // let begin = new Date();
        // begin.setUTCHours(0,0,0,0);
        // let end = new Date();
        // end.setUTCHours(23,59,59,999);
        let today = new Date();
        today = today.setUTCHours(23,59,59,999);
        let last = today - (6 * 24 * 60 * 60 * 1000);
        last = new Date(last);
        last = last.setUTCHours(0,0,0,0);
        today = new Date(today);
        last = new Date(last);
        const resOrder = await orderController.getDay(last, today).then((result)=>{
            if(result){
                // result = result.reduce((res, item) =>{
                //     if (!res[item.updatedAt]) {
                //         res[value.Id] = {
                //           Id: value.Id,
                //           qty: 0
                //         };
                //         result.push(res[value.Id])
                //       }
                //       res[value.Id].qty += value.qty;
                //       return res;
                // }, {});
                result = result.map(item => {
                    return new Date(item.updatedAt).setUTCHours(0,0,0,0);
                })
                res.json(result);
            }
        })
        
    }
}

const getMonday = (d) => {
    d = new Date(d);
    var day = d.getDay();
    console.log(day);
    let diff = d.getDate() - day + (day == 0 ? -6:1);
    console.log(diff);
    return new Date(d.setDate(diff));
}

const convertDay = (day) => {
    return new Date(day.setDate(day));
} 
  
module.exports = new AnalysisController();