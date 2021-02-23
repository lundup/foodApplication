const express = require("express");
 
const {isLoggedIn, logout} = require("../Controller/authController");

const { getDemoPage, getHomePage, getLoginPage, getSignUpPage, getPlanPage, getProfilePage, getForgetPasswordPage, getResetPasswordPage } = require("../Controller/viewController");
const viewRouter=express.Router();

viewRouter.use(isLoggedIn);

viewRouter.route("/").get(getDemoPage)
viewRouter.route("/home").get( getHomePage)
viewRouter.route("/login").get(getLoginPage)
viewRouter.route("/signup").get(getSignUpPage)
viewRouter.route("/plans").get(getPlanPage)
viewRouter.route("/logout").get(logout)
viewRouter.route("/profile").get(getProfilePage)
viewRouter.route("/forgetpassword").get(getForgetPasswordPage)
viewRouter.route("/resetpassword/:token").get(getResetPasswordPage)

module.exports=viewRouter
