const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

const products = [];

router.get('/add-product',(req,res,next)=>{
    console.log("Adding Product");
    // res.send("<form action='/admin/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>");
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render("add-product",{"pageTitle": "Add Product","path":"/admin/add-product","activeProduct":true,"formCSS":true,"productCSS":true});
});

// previously it was action= '/product' now action = '/admin/product' because we have mentioned admin as filtering path


router.post('/product',(req,res,next)=>{
    console.log("HELLO");
    products.push({"title":req.body.title});
    console.log(req.body);
    res.redirect('/');
    
});

exports.routes = router;
exports.products = products;

