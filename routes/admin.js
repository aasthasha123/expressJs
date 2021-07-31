const express = require('express');
const router = express.Router();
// const path = require('path');
const adminController = require('../controllers/admin');
const rootDir = require('../util/path');



router.get('/add-product', adminController.getAddProduct);

// previously it was action= '/product' now action = '/admin/product' because we have mentioned admin as filtering path


router.post('/product', adminController.postAddProduct);

router.get('/products', adminController.getProducts);
// exports.routes = router;
// exports.products = products;

router.get('/edit-product/:productId', adminController.getEditProduct)

router.post('/edit-product', adminController.postEditProduct);
router.post('/delete-product', adminController.deleteProduct);
module.exports = router;