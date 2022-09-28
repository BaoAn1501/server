const siteRouter = require('./site');
const categoryRouter = require('./category');
const apiRouter = require('./api');
function route(app) {
    app.use('/categories', categoryRouter);
    app.use('/api', apiRouter);
    app.use('/', siteRouter);
    
    
}

module.exports = route;