const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapaAsync.js");
const ExpressError = require("../utils/expressError.js");
// const { listingSchema, reviewSchema} = require("../schema.js");
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const { creatReview } = require("../controllers/reviews.js");

const reviewController = require("../controllers/reviews.js")



// --------------------REVIEWS ----------------------------------------------------------------------

//                                  -----POST ROUT-----

router.post("/",isLoggedIn, validateReview, 
wrapAsync( creatReview));

// ------------------DELETE review ROUTE---------------------------------------------------------------

router.delete("/:reviewId",
 isLoggedIn,
 isReviewAuthor, 
  wrapAsync( reviewController.destroyReview))

module.exports = router;