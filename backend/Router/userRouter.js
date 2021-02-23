

const express = require("express");
const userRouter = express.Router();
const {signup, login, protectRoute, forgetPassword, resetPassword} = require("../Controller/authController") 

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../Controller/userController");

// userRouter
// .route("")
// 
// 

userRouter
  .route("")
  .post(createUser)
  .get(getAllUsers)
  .get(protectRoute, getUserById)
  .patch( protectRoute, updateUserById)
  .delete(protectRoute, deleteUserById);
  userRouter.post("/signup", signup);
  userRouter.post("/login", login)
  userRouter.post("/forgetpassword", forgetPassword)
  userRouter.patch("/resetpassword/:token", resetPassword)

module.exports = userRouter;