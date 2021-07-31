const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');


module.exports = class Cart {
    static addProduct(id, productPrice){
        // Fetch the previous cart.

        fs.readFile(p, (err,fileContent)=>{
            let cart = {products: [], totalPrice: 0};

            if (!err) {
                cart = JSON.parse(fileContent);

            }
            // Analyze the cart => Find existing product.
        const existingProductIndex = cart.products.findIndex(prod => prod.id === id);

        const existingProduct = cart.products[existingProductIndex];
        let updated_product ;
        if (existingProduct){
            updated_product = {...existingProduct};
            updated_product.qty = updated_product.qty + 1;
            cart.products = [...cart.products];
            cart.products[existingProductIndex] = updated_product;

        }
        else{
            updated_product = {id: id, qty:1};
            cart.products = [...cart.products, updated_product];


        }
        cart.totalPrice = cart.totalPrice + +productPrice; // Here extra + will make productPrice string to number.
        fs.writeFile(p, JSON.stringify(cart), (err)=>{
            console.log(err);
        })
        })
        
        // Add new product// Increase the quantity.
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p,(err, fileContent)=>{
            if (err){
                return;
            }
            const updatedCart = {...JSON.parse(fileContent)};
            const product = updatedCart.products.find(prod => Number(prod.id) === Number(id) );
            if(!product){
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => Number(prod.id) !== Number(id));
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(p, JSON.stringify(updatedCart), (err)=>{
                console.log(err);
            })
        })
    }
    
    static getCart(cb){
        fs.readFile(p, (err, fileContent)=>{
            const cart = JSON.parse(fileContent);
            if(err){
                cb(NULL);
            }
            else{
                cb(cart);
            }
        })
    }
}

