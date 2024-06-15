const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapaAsync.js");
const ExpressError = require("../utils/expressError.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const {listingSchema} = require("../schema.js");
// const listingRouter = require("listing.js") ;
const multer = require("multer")
const{storage}= require("../cloudConfig.js");
const upload = multer({storage});

const listingControler = require("../controllers/listings.js");
const { deserializeUser } = require("passport");


router.route("/:id")
.get(wrapAsync(listingControler.showlisting))
.put(isLoggedIn, 
  isOwner , 
  upload.single("listing[Image]"),
   validateListing,
   wrapAsync
    ( listingControler.updatelisting))
   .delete( isLoggedIn,
    isOwner ,
    wrapAsync
    ( listingControler.destroylisting));


// -----------------INDEX ROUTE--------------------------------------------------------------------------------------------

// router.get("/", wrapAsync(listingControler.index));
  

  // // ----------------------- NEW ROUTE----------------------------------------------------------------------------------
  
  // router.get("/new", (req,res)=>{
  //     res.render ("listings/new.ejs");
  // });
  
//   // ----------------------------CREATE ROUTE--------------------------------------------------------------------------
  
router.route("/")
.get(wrapAsync(listingControler.index))
.post( upload.single("listing[Image]"),validateListing,
  wrapAsync(listingControler.creatlisting));

  // ------------------------------- EDIT ROUTE  -----------------------------------------------------------------------
  
  router.get("/:id/edit", isLoggedIn,isOwner ,wrapAsync(listingControler.editlisting));
  

  module.exports = router;