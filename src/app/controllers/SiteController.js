class SiteController {
    // [GET] /
    index(req, res, next) {
        res.send('home page');
    }
}

module.exports = new SiteController();
