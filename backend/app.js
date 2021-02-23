  
const express = require("express");
const planRouter = require("./Router/planRouter");
const userRouter = require("./Router/userRouter");
const mongoose = require('mongoose');
const path = require("path")
const app = express();
const viewRouter=require("./Router/viewRouter")
const cookieparse=require("cookie-parser");
const bookingRouter = require("./Router/bookingRouter");

app.set("view engine" , "pug");

// view path set
app.set("views" , path.join(__dirname,"View"));

app.use(cookieparse())
// it tracks incoming request and see if there is data in the request => the data will be fed in req.body
app.use(express.json());
app.use(express.static("public"));
// app.httpMethod( appRoute , cb function( request , response   )      )
app.use("/api/plans" , planRouter);
app.use("/api/users" , userRouter);
app.use("/api/bookingrouter", bookingRouter)
app.use("", viewRouter)

app.listen(3000, function () {
  console.log("server started at port 3000");
});