if(process.env.NODE_ENV != "production"){
         require('dotenv').config();
        };

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
// const multer = require("multer")
// const upload = multer({dest: "uploads/"});
// const router = express.Router();
const multer = require("multer");
const{storage}= require("./cloudConfig.js");
const upload = multer({storage});



const ExpressError = require("./utils/expressError.js");
const wrapAsync = require("./utils/wrapaAsync.js");
const listingRouter = require("./routes/listing.js") ;
const reviewRouter = require("./routes/reviews.js");
const {listingSchema} = require("./schema.js");
const Listing = require("./models/listing.js");
const user = require("./models/user.js");
const userRouter = require("./routes/user.js");
const {isLoggedIn} = require("./middleware.js");


const mongoUrl =  'mongodb://127.0.0.1:27017/wanderlust' ;

main()
.then(()=>{
    console.log("connection to db")
})
.catch(err=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(mongoUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));


const validateListing = (req,res,next)=>{
    let {error} =  listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400, errMsg);
    }else{
    next();
};};

const sessionOption = {
    secret: "mysupersecretcode",
    resave: false,
    saveUnintialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpsOnly:true,
}
};

// app.get("/", (req,res)=>{
//     res.send("hi am groot");
// });

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

app.get("/demouser", async(req,res)=>{
let fakeUser = new user({
    email: "student@gmail.com",
    username : "apna beta"
});

let registeredUser =  await user.register(fakeUser, "password")
res.send(registeredUser);

});


// =================================NEW ROUTE===================================================

app.get("/listings/new", isLoggedIn ,(req,res)=>{
    res.render("listings/new.ejs");
});

// -------------------------CREATE ROUTE ---------------------------------------------------

//  app.post(isLoggedIn ,validateListing, 
//   wrapAsync( async (req,res,next)=>{  
//   const newListing = new Listing(req.body.listing);
//   newListing.owner = req.user._id;
//       await newListing.save();
//       req.flash("success", "new listing created");
//      res.redirect("/listings");
   
//   }));



// app.post("/listings" , upload.single('listing[image]'),(req,res)=>{
//     res.send(req.file);
// })
//   ===========================================================================================

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/",userRouter);


app.all("*",(req,res,next)=>{
next(new ExpressError(404, "!page not found!"));
})

app.use((err,req,res,next)=>{
    let{statusCode = 500,message = "Something want wrong"} = err;
    res.status(statusCode).render("err.ejs",{message})

});


app.listen(8080, ()=> {
    console.log("server is listning on port 8080")
});

