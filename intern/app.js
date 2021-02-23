const express=require('express');
const app=express();
const cookieparse=require("cookie-parser");



app.use(express.json());
var path = require("path");
const { createUser, getuser, deleteUser, getHomePage, getLoginPage } = require('./controller/userController');
app.set("view engine" , "pug");

// view path set
app.set("views" , path.join(__dirname,"View"));

app.use(cookieparse())

app.use(express.static("public"));

app.get("/home", getHomePage)
app.get("/login", getLoginPage)
app.post('/api/createUser', createUser )
app.post('/api/getUser', getuser)
app.delete('/api/deleteuser',deleteUser)



app.listen(3000, function () {
    console.log("server started at port 3000");
  });