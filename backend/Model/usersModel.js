const mongoose = require("mongoose");
const crypto= require("crypto")

mongoose.connect("mongodb+srv://admin:admin@cluster0.lsrk5.mongodb.net/userCollection?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})

    
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
    minlength:[6 , "Password must be greater than 6 characters"],
    required:true
  } ,
  confirmPassword:{
    type:String,
    minlength:[6 , "Password must be greater than 6 characters"],
    validate : {
      validator: function(){
        return this.password == this.confirmPassword;
      } ,
      message:"Password didn't matched !!"
    }
  },
  role:{
    type:String,
    enum:["admin" , "user" , "restaurant owner" , "delivery boy"],
    default:"user"
  },
  pwToken:{
    type:String
  },
  tokenTime:{
    type:String
  }
})

userSchema.methods.createPwToken=function(){
  let token=crypto.randomBytes(32).toString("hex")
  let time= Date.now() * 60 * 10 * 1000;
  this.pwToken=token;
  this.tokenTime=time
  console.log("indie create token")
  return token
}

userSchema.methods.resetPW=function(password, confirmPassword){

  this.password=password;
  this.confirmPassword=confirmPassword;
  this.pwToken="";
  this.tokenTime="";

}

const userModel = mongoose.model("userscollection" , userSchema);
module.exports = userModel;