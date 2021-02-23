const userModel=require('../backend/db')
const mongoose = require('mongoose');
async function createUser(req , res){

    try{
let user = req.body;

      let newUser = await userModel.create({
          name: user.name,
          email: user.email,
          password:user.password
          
      })
      console.log(newUser)
      res.status(201).json({
        message:"Succesfully Signed up !!",
        data: newUser
    })

    }
catch(error){
    res.status(200).json({
        message:"Failed to create!!",
        error
    })
}
    
}
async function getUser(req,res){
    try{
     let {email , password}=req.body
        console.log(email, password)
        let loggedUser = await userModel.find({email:email});
        let user = loggedUser[0];
    
        
        if(user){
            console.log(loggedUser)
            console.log(user.password)
            if(user.password == password){
                console.log("inside password")
            
            res.status(200).json({
                message:"Logged in succesfully !!",
                data : user,
                 
            })
            }
            else{
                res.status(200).json({
                    message:"Password didn't Matched !!",
                })
            }
            
            
        } else{
            res.status(200).json({
                message:"Email and Password didn't Matched !!",
            })
        }
    
    }
       catch(error){
    error
       }
    }

    async function deleteUser(req,res){
    
        try{
            let {id} = req.body;
            console.log(id)
            let deletedUser =await userModel.findByIdAndDelete(id);
            if(deletedUser){
              res.status(200).json({
                message:"User deleted Succesfulyy !!",
                data : deletedUser
              })
            }
            else{
              res.status(200).json({
                message:"User not Found !!!"
              })
            }
          }
          catch(error){
            res.status(501).json({
              message:"User failed to delete !!",
              error
            })
          }
          
      
    }
 function getHomePage(req, res) {
        // send demo page to client
         
        res.render("index.pug");
      }
function getLoginPage(req, res) {
        // send demo page to client
         
        res.render("login.pug");
      }

    module.exports.createUser= createUser
    module.exports.getuser=getUser
    module.exports.deleteUser=deleteUser
    module.exports.getHomePage=getHomePage
    module.exports.getLoginPage=getLoginPage