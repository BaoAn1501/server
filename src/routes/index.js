const siteRouter = require('./site');
const categoryRouter = require('./category');
const userRouter = require('./user');
const productRouter = require('./product');
const sizeRouter = require('./size');
const apiRouter = require('./api');

function route(app) {
    app.use('/categories', categoryRouter); // Loại
    app.use('/products', productRouter);
    app.use('/sizes', sizeRouter);
    app.use('/users', userRouter);
    app.use('/api', apiRouter);
    app.use('/', siteRouter); //localhost:3000/
}

module.exports = route;