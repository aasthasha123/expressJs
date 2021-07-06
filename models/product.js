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
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};
