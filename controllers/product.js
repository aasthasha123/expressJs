const Product = require('../models/product'); 
exports.getAddProduct = (req, res, next) => {
    // res.send("<form action='/admin/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>");
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  }

exports.postAddProduct = (req,res,next)=>{
    // console.log("HELLO");
    const product = new Product(req.body.title)
    product.save();
    // products.push({"title":req.body.title});
    console.log(req.body);
    res.redirect('/');
    
}

exports.getProducts = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    const products = Product.fetchAll(); // we don't have to use new keyword because it is a static function.
    
    res.render('shop', {
      products: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  }