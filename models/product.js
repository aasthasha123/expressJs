// const fs = require('fs');
// const path = require('path');
// const products = []
// module.exports = class Product{
//     constructor(t){
//         this.title = t;
//     }

//     save(){
//         const p = path.join(path.dirname(process.mainModule.filename),'data', 'products.json');
//         // Here data is the folder and products.json is the name of the file.
//         // We'll first get the existing array of products (reading the file).
//         fs.readFile(p, (err, data)=>{
//             let products = [];
//             if (!err){ //products exist/// file exists 
//                 products = JSON.parse(data);
//             }
//             products.push(this);
//             //saving file
//             fs.writeFile(p, JSON.stringify(products), (err)=>{
//                 console.log(err);
//             } )
//         })

//         // products.push(this)
//     }

//     static fetchAll(cb){
//         const p = path.join(path.dirname(process.mainModule.filename),'data', 'products.json');

//         fs.readFile(p, (err, data)=>{
//             if(err){ //NO PRODUCT
//                 cb([]);
//             }
//             cb(JSON.parse(data));
//         })
//         // return products;
//     }
// }








const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = Number(id);
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    
    getProductsFromFile(products => {
      if(this.id){
        console.log(this.id);
        console.log("DKKD");
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        console.log(existingProductIndex);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        console.log(updatedProducts); 
        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      }
      else{
        this.id = Math.random();
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
      }
    });
  }

  static deleteById(id){
     getProductsFromFile(products => {
      //  const productIndex = products.findIndex(prod => prod.id === id);
      const product = products.find(prod => prod.id === Number(id));
      const updatedProducts = products.filter(prod => prod.id !== Number(id));
      fs.writeFile(p, JSON.stringify(updatedProducts), err =>{
        if(!err){
          Cart.deleteProduct(id, product.price);
        }
      });
     });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb){
    getProductsFromFile(products => {
      const product = products.find(p => p.id == id);
      cb(product);
    });
  }
};
