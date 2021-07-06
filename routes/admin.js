const express = require('express');
const router = express.Router();
// const path = require('path');
const productsController = require('../controllers/product');
const rootDir = require('../util/path');



router.get('/add-product', productsController.getAddProduct);

// previously it was action= '/product' now action = '/admin/product' because we have mentioned admin as filtering path


router.post('/product', productsController.postAddProduct);

// exports.routes = router;
// exports.products = products;

module.exports = router;