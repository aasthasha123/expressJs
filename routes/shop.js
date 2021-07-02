const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path')
const adminData = require('./admin');



router.get('/', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    const products = adminData.products;
    res.render('shop', {
      products: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
  
  module.exports = router;

module.exports = router;