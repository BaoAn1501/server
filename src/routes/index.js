const siteRouter = require('./site');
const categoryRouter = require('./category');
const userRouter = require('./user');
const productRouter = require('./product');
const sizeRouter = require('./size');
const apiRouter = require('./api');
const orderRouter = require('./order');
const analysisRouter = require('./analysis');

function route(app) {
    app.use('/analysis', analysisRouter);
    app.use('/categories', categoryRouter);
    app.use('/products', productRouter);
    app.use('/sizes', sizeRouter);
    app.use('/users', userRouter);
    app.use('/api', apiRouter);
    app.use('/orders', orderRouter);
    app.use('/', siteRouter); //localhost:3000/
}

module.exports = route;