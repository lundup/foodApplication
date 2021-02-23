const userModel = require("../Model/usersModel");


async function createUser(req, res) {
 try{
   let user=req.body;
  
 let users=await userModel.create(user)

  res.status(201).json({
    message: "Successfully create a user !",
    data: users,
  });
 }
  catch(error){
    res.status(501).json({
      message:"Failed to create a plan",
      error : error
    })
  }
  
  
}

async function getAllUsers(req,res){
  if (userDB.length) {
    res.status(200).json({
      message: "Got all users successfully",
      data: userDB,
    });
  } else {
    res.status(200).json({
      message: "No users found !!!",
    });
  }
}


async function getUserById(req, res) {
 
 
 try{

  let id = req.id;
  // get user 
  let user = await userModel.findById(id);
  console.log(user);
  res.status(200).json({
    message:"Got user By id !!",
    data : user
  })
 } 
 catch(error){
   res.status(404).json({
      message:"fail to get user",
   error:error
   })
  
 }

}


 async function updateUserById(req, res) {
try{ 
   let id = req.id;
  let updateObj = req.body.updateObj;
  let user = await userModel.findById(id);

  for(key in updateObj){
    user[key] = updateObj[key];
  }

  let updatedUser = await user.save();
  console.log(updatedUser)
  res.status(201).json({
    message:"Updated User",
    data : updatedUser
  })
}

catch(error){
  res.status(501).json({
    message:"fail to update",
    error:error
  })
}

}


async function deleteUserById(req, res) {
  try{
    let id = req.id;
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

module.exports.getAllUsers = getAllUsers;
module.exports.createUser = createUser;
module.exports.getUserById = getUserById;
module.exports.updateUserById = updateUserById;
module.exports.deleteUserById = deleteUserById;