const Product = require('../models/product'); 


exports.getAddProduct = (req, res, next) => {
    // res.send("<form action='/admin/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>");
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    console.log("HELLO");
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
    });
  }

exports.postAddProduct = (req,res,next)=>{
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    console.log("I AM HERE");
    const product = new Product(null, title,imageUrl,description,price)
    product.save();
    // products.push({"title":req.body.title});
    console.log(req.body);
    res.redirect('/products');
    
}

exports.getProducts = (req,res,next) =>{
    Product.fetchAll(products => {
        res.render('admin/products',{
            products:products,
            path: '/admin/products',
            pageTitle:'Admin Products'
        })
    })
}


exports.getEditProduct = (req, res, next) => {
    // res.send("<form action='/admin/product' method='POST'><input type='text' name='title'><button type='submit'>Add Product</button></form>");
    // res.sendFile(path.join(rootDir,'views','add-product.html'));
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
          });
    });
    
  }

exports.postEditProduct = (req,res,next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedImageUrl = req.body.imageUrl;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.deleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    console.log(prodId);
    Product.deleteById(prodId);
    res.redirect('/admin/products');

}