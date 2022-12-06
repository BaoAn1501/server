const controller = require("../components/products/controller");
const categoryController = require("../components/categories/controller");
const sizeController = require("../components/sizes/controller");
const productSizeController = require("../components/product_sizes/controller");
const cartController = require("../components/cart_item/controller");
const reviewController = require("../components/reviews/controller");

class ProductController {
  // [GET] /api/products
  async index(req, res, next) {
    let products = await controller.getAll();
    products = products.map(async (item) => {
      console.log("_id: ", item._id);
      const minItem = await findMin(item._id);
      if(minItem){
        item.price = minItem.price;
        item.size = minItem.size_symbol;
      } else {
        item.price = 0; 
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

  // [GET] /api/products/:id
  async one(req, res, next) {
    const { id } = req.params;
    let sizes = await productSizeController.getAll(id);
    console.log("sizes: ", sizes);
    sizes = sizes.filter((item) => {
      return item.price > 0;
    });
    // .entries().next().value;
    res.json(sizes);
  }

  // [GET] /api/products/:id/:slug
  async oneSlug(req, res, next) {
    console.log("run product one slug");
    const { id, slug } = req.params;
    console.log("id: ", id, "slug: ", slug.toUpperCase());
    const size = await sizeController.getBySlug(slug.toUpperCase());
    const size_id = String(size._id);
    console.log("size_id: ", size_id);
    const productSize = await productSizeController.getOne(id, size_id);
    res.json(productSize);
  }

  async saveCart(req, res, next) {
    const { id, slug } = req.params;
    let { body } = req;
    const user_id = body.user_id;
    console.log("user_id: ", user_id);
    const size = await sizeController.getBySlug(slug.toUpperCase());
    const size_id = String(size._id);
    const productSize_id = await productSizeController.getOne(id, size_id);
    console.log("productSize_id: ", productSize_id);
    // const allCartItem = await cartController.getAll(user_id);
    const cartItem = await cartController.getOne(productSize_id, user_id);
    console.log("cartItem: ", cartItem);
    if (cartItem) {
      console.log("has cart already, ", cartItem);
      console.log(
        "item id, ",
        cartItem._id,
        " item quantity: ",
        cartItem.quantity
      );
      await cartController
        .update(cartItem._id, cartItem.quantity + 1)
        .then(() => {
          res.json({ message: "Sản phẩm đã được thêm vào giỏ hàng" });
          console.log("################################### updated");
        })
        .catch((error) => res.json(error));
    } else {
      body = {
        productSize_id,
        user_id,
        quantity: 1,
      };
      await cartController
        .insert(body)
        .then(() => {
          res.json({ message: "Sản phẩm đã được thêm vào giỏ hàng" });
          console.log("################################### success");
        })
        .catch((error) => res.json(error));
    }
  }

  async minusCart(req, res, next) {
    const { id, cid } = req.params;
    const cartItem = await cartController.getById(cid);
    if (cartItem.quantity > 1) {
      await cartController
        .update(cid, cartItem.quantity - 1)
        .then((cart) => {
          res.json(cart);
        })
        .catch((error) => {
          res.json(error);
        });
    } else {
      await cartController
        .delete(cid)
        .then(() => {
          res.json({ message: "Đã xóa sản phẩm" });
        })
        .catch((error) => {
          res.json(error);
        });
    }
  }

  async plusCart(req, res, next) {
    const { id, cid } = req.params;
    const cartItem = await cartController.getById(cid);
    await cartController
      .update(cid, cartItem.quantity + 1)
      .then((cart) => {
        res.json(cart);
      })
      .catch((error) => {
        res.json(error);
      });
  }

  async deleteCart(req, res, next) {
    const { id, cid } = req.params;
    await cartController
      .delete(cid)
      .then(() => {
        res.json({ message: "Đã xóa sản phẩm" });
      })
      .catch((error) => {
        res.json(error);
      });
  }

  async deleteAllCart(req, res, next) {
    const { id } = req.params;
    await cartController
      .deleteAll(id)
      .then(() => {
        res.json({ message: "Đã xóa tất cả sản phẩm" });
      })
      .catch((error) => {
        res.json(error);
      });
  }

  async cart(req, res, next) {
    const { id } = req.params;
    await cartController
      .getAll(id)
      .then((carts) => {
        carts = carts.map(async (cart) => {
          const productSize_id = await productSizeController.getById(
            cart.productSize_id._id
          );
          cart.productSize_id = productSize_id;
          return cart;
        });
        Promise.all(carts).then((result) => {
          result = result.sort((a, b) => {
            if (
              a.productSize_id.product_id.name <
              b.productSize_id.product_id.name
            ) {
              return -1;
            } else if (
              a.productSize_id.product_id.name >
              b.productSize_id.product_id.name
            ) {
              return 1;
            } else {
              if (
                a.productSize_id.size_id.symbol >
                b.productSize_id.size_id.symbol
              ) {
                return -1;
              } else if (
                a.productSize_id.size_id.symbol <
                b.productSize_id.size_id.symbol
              ) {
                return 1;
              } else {
                return 0;
              }
            }
          });
          res.json(result);
        });
      })
      .catch((error) => {
        res.json(error);
      });
  }

  async getByProduct(req, res, next) {
    const { id } = req.params;
    await reviewController
      .getByProduct(id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => res.json(error));
  }
  // [POST] /api/users/:id/review/yet
  async getByUserYet(req, res, next) {
    const { id } = req.params;
    console.log('get id user review: ', id);
    await reviewController
      .getByUserYet(id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => res.json(error));
  }
  // [POST] /api/users/:id/review/already
  async getByUserAl(req, res, next) {
    const { id } = req.params;
    await reviewController
      .getByUserAl(id)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => res.json(error));
  }

  async rate(req, res, next) {
    const { id, _id } = req.params;
    let { body } = req;
        body = {
            score: body.body.score,
            remarks: body.body.remarks
        }
    console.log('data: ', body);
    await reviewController
      .update(_id, body)
      .then(() => {
        res.json({message: "Đánh giá sản phẩm thành công"})
      })
      .catch((error) => {
        res.json(error);
      });
  }

  async search(req, res, text) {
    const {id} = req.params;
    // const {name} = req.body;
    let products = await controller.search(req.query.text);
    products = products.map(async (item) => {
      console.log("_id: ", item._id);
      const minItem = await findMin(item._id);
      if(minItem){
        item.price = minItem.price;
        item.size = minItem.size_symbol;
      } else {
        item.price = 0; 
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

module.exports = new ProductController();
