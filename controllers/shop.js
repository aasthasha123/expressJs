const Product = require('../models/product'); 
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    // we don't have to use new keyword because it is a static function.
    Product.fetchAll().then(
      ([rowData, fielData])=>{
        res.render('shop/product-list', {
          products: rowData,
          pageTitle: 'All Products',
          path: '/products',
          hasProducts: rowData.length > 0,
          activeShop: true,
          productCSS: true
        })
      }
    ).catch(err=>console.log(err));
    
  };

  exports.getProduct = (req,res,next) =>{
    const prodId = req.params.productId; // we have passed this productId param in routes.
    Product.findById(prodId).then(
      ([rowData, fieldData]) => {
        res.render('shop/product-detail',{
          product: rowData[0],
          pageTitle:"Product Details",
          path:"/products"
        })
      }
    ).catch(err=>console.log(err));
  }

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, fieldData])=>{
    res.render('shop/index',{
      products: rows,
      pageTitle: 'Shop',
      path: '/',
    });
  })
  .catch(err => console.log(err));
  
};

exports.getCart = (req,res,next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products){
        const cartProductsData = cart.products.find(prod => Number(prod.id) === Number(product.id));
        console.log(cartProductsData);
        if (cartProductsData){
          cartProducts.push({productData:product, qty: cartProductsData.qty});
        }
      }
      res.render('shop/cart',{
        path: '/cart',
        pageTitle: "Your Cart",
        products: cartProducts,
      })
    });
  })
}

exports.postCart = (req,res,next) => {
  const productId = req.body.productId;
  Product.findById(productId,(product)=>{
    Cart.addProduct(productId, product.price);
  })
  res.redirect('/cart'); // getCart will be executed here.
}

exports.getCheckout = (req,res,next) => {
  res.render('shop/checkout',{
    path:'/checkout',
    pageTitle: "Checkout"
  })
}

exports.getOrders = (req,res,next) =>{
  res.render('shop/orders',{
    path:'/orders',
    pageTitle:"Orders"
  })
}

exports.postCartDeleteProduct = (req,res,next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  })

}