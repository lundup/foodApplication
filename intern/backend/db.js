const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin@cluster0.c96nz.mongodb.net/userscollection?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})

    
.then((db) => {
    console.log("Connected to usersModel db !!!");
  });

let userSchema = new mongoose.Schema({
  name : {
    type:String,
    required:true
  },
  email : {
    type:String ,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  } 
})


const userModel = mongoose.model("userscollection" , userSchema);
module.exports = userModel;