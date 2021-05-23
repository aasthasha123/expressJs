const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const expressHbs = require('express-handlebars') // HandleBars
// app.use((req,res,next)=>{
//     console.log("FIRST");
//     next();
// });

// app.use((req,res,next)=>{
//     console.log("SECOND");
//     res.send("HELLO");
// });

//ROUTING 

// app.use('/users',(req,res,next)=>{
//     console.log("/users PATH");
//     res.send("HELLO USERS");
// })
 
// app.use('/',(req,res,next)=>{
//     console.log("/ PATH");
//     res.send("HELLO"); 
// })

// Parsing Requests
app.engine('hbs', expressHbs({layoutsDir:'views/layouts/', defaultLayout:'main-layout',extname:"hbs"}));
// app.set("view engine","pug");
app.set("view engine", 'hbs') // now we'll use handlebars instead of pug
// template engine to be used 
app.set("views","views");
// our views folder 

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))
app.use('/admin',adminData.routes);
app.use(shopRoutes);


app.use((req,res,next)=>{
    // res.status(404).sendFile(path.join(__dirname,"views","pagenotfound.html"));    

    res.status(404).render("pagenotfound",{pageTitle:"Page Not Found"});
})

app.listen(3000);

// In handlebars we can't run any logic we need to send the output only