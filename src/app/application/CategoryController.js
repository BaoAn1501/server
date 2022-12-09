const controller = require('../components/categories/controller');
const pController = require('../components/products/controller');
const productSizeController = require("../components/product_sizes/controller");
const reviewController = require("../components/reviews/controller");

const fs = require('fs');

class CategoryController {

    // [GET] /api/categories
    async index(req, res, next) {
        console.log('run categories all');
        await controller.getAll()
        .then(categories => {
            console.log(categories, 'categories in controller$');
            res.json(categories);
        })
        .catch(error => res.json(error));
    }
    // [GET] /api/categories/:id
    async one(req, res, next) {
        console.log('run category one');
        const { id } = req.params;
        let products = await pController.getAll();
        products = products.filter(item => {
            return String(item.category_id._id) === id;
        })
        products = products.map(async (item) => {
            console.log("_id: ", item._id);
            const minItem = await findMin(item._id);
            let reviews = await reviewController.getByProduct(item._id);
            reviews = reviews.filter(item => {
              return item.score>0;
            })
            let total = reviews.reduce((acc, item) => {
              return acc + item.score;
            }, 0);
            let average = total / reviews.length;
            if(minItem){
              item.price = minItem.price;
              item.size = minItem.size_symbol;
            } else {
              item.price = 0; 
            }
            if(average > 0){
              item.rating = average;
            } else {
              item.rating = 0;
            }
            console.log("item after: ", item);
            return item;
        });
        Promise.all(products).then((result) => {
        result = result.filter((item) => {
            return item.price > 0;
        });
        res.json(result);
        });
    }
}

const findMin = async (id) => {
    const products = await productSizeController.getAll(id);
    // console.log('all productSize: ', products);
    const list = products.filter((item) => {
      return Number(item.price) > 0;
    });
    // console.log('list > 0: ', list);
    // console.log('list has price > 0 length: ', list.length);
    let t;
    if (list.length > 0) {
      // console.log('find min running');
      t = list.reduce(function (accumulator, element) {
        return accumulator.price < element.price ? accumulator : element;
      });
      console.log("t: ", t);
      return t;
    } else {
      return null;
    }
  };

module.exports = new CategoryController();