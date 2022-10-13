const siteRouter = require('./site');
const categoryRouter = require('./category');
const userRouter = require('./user');
const productRouter = require('./product');

function route(app) {
    app.use('/categories', categoryRouter);
    app.use('/products', productRouter);
    app.use('/users', userRouter);
    app.use('/', siteRouter);


}

module.exports = route;