const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
// const { name } = require("ejs");
const path = require("path");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(session({secret: "my supersecretstring", resave: false, saveUninitialized: true}));
app.use(flash());


app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})

app.get("/register",(req,res)=>{
let{name = "rana"} = req.query;
req.session.name = name;

if( name === "rana"){
   req.flash("error", "user not registered")
}else{
    req.flash("success", "user registered sucessfully")  
}

res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    res.render("page.ejs", {name: req.session.name});
})


// app.get("/reqcount", (req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1 ;
//     }
//     // req.session.count = 1 ;
//     res.send(`you send a request ${req.session.count} times`)
// })


// app.get("/test",(req,res)=>{
//     res.send("test sucessfull");
// })

app.listen(3000, ()=>{
    console.log("server is listning on 3000");
});