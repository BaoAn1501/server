const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const productSizeController = require('../app/controllers/ProductSizeController');
const upload = require('../middleware/upload');
const authentication = require('../middleware/authentication');

router.post('/create', [upload.fields([{
        name: 'image1',
        maxCount: 1
    }, {
        name: 'image2',
        maxCount: 1
    },
    {
        name: 'image3',
        maxCount: 1
    }
]), authentication.checkLogin], productController.insert);
router.get('/:id/edit', [authentication.checkLogin], productController.one);
router.post('/:id/size', [authentication.checkLogin], productSizeController.update);
router.get('/:id/size', [authentication.checkLogin], productSizeController.index);
router.get('/:id/product-size', productSizeController.sizes);
router.delete('/:id/delete', [authentication.checkLogin], productController.delete);
router.post('/:id/edit', [upload.fields([{
    name: 'image1',
    maxCount: 1
}, {
    name: 'image2',
    maxCount: 1
},
{
    name: 'image3',
    maxCount: 1
}
]), authentication.checkLogin], productController.update);
router.get('/create', [authentication.checkLogin], productController.create);
router.get('/', [authentication.checkLogin], productController.index);

module.exports = router;