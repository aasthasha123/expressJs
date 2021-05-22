const express = require('express');
const path = require('path');
const router = express.Router();
const rootDir = require('../util/path')
const adminData = require('./admin');

router.get('/',(req,res,next)=>{
    // res.send("<h1>HELLO WORLD!!!</h1>");
    console.log('shop.js', adminData.products);
    const products = adminData.products;
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render('shop',{"products":products,'pageTitle':"Shop","path":"/",hasProducts:products.length > 0}); // here shop is the pug file
})

module.exports = router;