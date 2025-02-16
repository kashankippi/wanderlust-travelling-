const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/user");
const wrapaAsync = require("../utils/wrapaAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const usercontroller = require("../controllers/users")


router.route("/signup")
.get(usercontroller.renderSignupForm)
.post(wrapaAsync(usercontroller.signup ));


router.route("/login")
.get(usercontroller.renderLoginForm)
.post(saveRedirectUrl,
passport.authenticate("local",
 {failureRedirect: "/login", 
 failureFlash: true
}), 
usercontroller.login);

router.get("/logout",usercontroller.logout)

module.exports = router;