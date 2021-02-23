var jwt = require('jsonwebtoken');

const userModel = require("../Model/usersModel");

const nodemailer=require("nodemailer")
async function main(message) {
  
    let transporter = nodemailer.createTransport({
        service:"gmail",
        host: "smtp.gmail.com",
        port: 2525,
        auth: {
          user: "lundup.vijra@gmail.com",
          pass: "gvjkqqanhohdzuun"
        }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: message.from, // sender address
      to: message.to, // list of receivers
      subject: "Reset password link", // Subject line
      text: message.text, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
 
async function signup(req, res) {
  try {
      let user = req.body;
      let newUser = await userModel.create({
          name: user.name,
          email: user.email,
          password:user.password,
          confirmPassword:user.confirmPassword,
          role:user.role
      })
      console.log(newUser);
      res.status(201).json({
          message:"Succesfully Signed up !!",
          data: newUser
      })
  } catch (error) {
      res.status(200).json({
          message:"Failed to sign up !!",
          error
      })
  }
}

async function login(req, res) {
    try{
        let {email , password} = req.body;
        console.log(email , password);
        let loggedInUser = await userModel.find({email:email});
        
        if(loggedInUser.length){
            let user = loggedInUser[0];
            console.log(user)
            if(user.password == password){
                const token = jwt.sign({id:user["_id"] }, 'shhhhh');
                res.cookie("jwt", token, { httpOnly: true });
                res.status(200).json({
                    message:"Logged in succesfully !!",
                    data : loggedInUser[0],
                     token
                })
            }
            else{
                res.status(200).json({
                    message:"Email and Password didn't Matched !!",
                })
            }
        }
        else{
            res.status(200).json({
                message:"No User Found SignUp First",
            })
        }
    }
    catch(error){
        res.status(200).json({
            message:"Login Failed !!",
            error
        })
    }
}

async function protectRoute(req , res , next){
    
try{
    const token=req.cookies.jwt
   
    console.log(token)
    
    console.log(token);
    const payload = jwt.verify(token , 'shhhhh');
    console.log(payload);
    if(payload){
        // id is stuffed into req.id
        req.id = payload.id;
        next();
    }
    else{
        res.status(501).json({
            message:"Please Log in !!"
        })
    }
}
catch(error){
    res.status(501).json({
        message:"Please Log in !!",
        error
    })

}

}

async function isLoggedIn(req, res, next) {
    try {
      let token = req.cookies.jwt;
      
      const payload = jwt.verify(token, 'shhhhh');
     
      if (payload) {
        // logged in hai
        let user = await userModel.findById(payload.id); 
        
        req.name = user.name;
  
        next();
      } else {
        //logged in nhi hai
        next();
      }
    } catch (error) {
      next();
    }
    
  }
  
async function isAuthorized(req , res , next){
    try{
      let id = req.id;
      console.log(req.id)
      let user = await userModel.findById(id);
      console.log(user);
      if(user.role == "admin"){
        next();
      }else{
        res.status(200).json({
          message:"You dont have admin rights !!!"
        })
      }
    }
    catch(error){
      res.status(501).json({
        message:"Failed to Authorize",
        error
      })
    }
  }
async function logout(req, res) {
    try {
      res.clearCookie("jwt");
      res.redirect("/home");
    } catch (error) {
      res.status(501).json({
        error,
      });
    }
  }

async function forgetPassword(req, res){

          try{
 let {email}=req.body;
  let user=await userModel.findOne({email:email});
   console.log(user)
   if(user){
     console.log("inside user")
let token=user.createPwToken();
console.log(token)
await user.save({validateBeforeSave:false});

let resetLink=`http://localhost:3000/resetpassword/${token}`
console.log(resetLink,"    ", email)
let message={
  from:"lundup.vijra@gmail.com",
  to:email,
  text:resetLink

}
let response=await main(message)
res.json({
  message:"Reset Link is sent to email",
  response
})


console.log("message")
main(message)
   }
   else{
    res.status(404).json({
      message: "User Not Found ! Please Sign up first !",
    });
   }
              }
          catch(error){
               res.json({
                   error
                      })
 
                      }
  
}

async function  resetPassword(req,res){

try{
  
let token=req.params.token;
console.log(token)
let {password, confirmPassword}=req.body;
let user=await userModel.findOne({
  pwToken:token,
  tokenTime:{ $gt: Date.now() }
  
})

if (user){
console.log(user)
user.resetPW(password, confirmPassword);

await user.save();
res.status(200).json({
  message: "reset succesfully!",
});
}
else{
  res.status(200).json({
    message: "Password Reset Link Expired !!!",
  });
}

}
catch(error){

}

}

module.exports.resetPassword=resetPassword
module.exports.forgetPassword=forgetPassword
module.exports.isAuthorized=isAuthorized  
module.exports.protectRoute =  protectRoute
module.exports.signup = signup;
module.exports.login = login;    
module.exports.logout=logout;
module.exports.isLoggedIn=isLoggedIn                                   