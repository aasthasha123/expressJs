exports.get404Page = (req,res,next)=>{
    // res.status(404).sendFile(path.join(__dirname,"views","pagenotfound.html"));    

    res.status(404).render("pagenotfound",{pageTitle:"Page Not Found"});
};