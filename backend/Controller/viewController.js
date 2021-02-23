const plansModel=require("../Model/plansModel")



function getDemoPage(req, res) {
    // send demo page to client
     
    res.render("demo.pug");
  }

  function getHomePage(req,res){
       
      res.render("home.pug",{name:req.name})
  }
  function getLoginPage(req,res){
      res.render("login.pug" , {name:req.name})
  }
  function getSignUpPage(req,res){
      res.render("signup.pug" , {name:req.name})
  }
   async function getPlanPage(req,res){
      let plans=await plansModel.find()
      res.render("plans.pug" , {plans:plans})
  }

  function getProfilePage(req, res){
      res.render("profile.pug")

  }
 function getForgetPasswordPage(req,res)
{
res.render("forgetpassword.pug")
}  


function getResetPasswordPage(req,res){
    res.render("resetpassword.pug")
}



  module.exports.getResetPasswordPage=getResetPasswordPage
  module.exports.getForgetPasswordPage=getForgetPasswordPage
  module.exports.getProfilePage=getProfilePage;
  module.exports.getPlanPage=getPlanPage
  module.exports.getSignUpPage=getSignUpPage
  module.exports.getLoginPage=getLoginPage
  module.exports.getDemoPage=getDemoPage
  module.exports.getHomePage=getHomePage