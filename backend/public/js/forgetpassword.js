const resetEmail=document.querySelector("#resetEmail")
const resetEmailBtn=document.querySelector("#resetEmailBtn")
const resetPasswordBtn=document.querySelector("#resetPasswordBtn")
const password=document.querySelector("#password")
const confirmPassword=document.querySelector("#confirmPassword")
console.log("hello im  at start")
if(resetEmailBtn){
  resetEmailBtn.addEventListener("click", async  function(e){
   
console.log(resetEmail.value)
    if (resetEmail.value){
        const response = await axios.post("/api/users/forgetpassword", { email:resetEmail.value });
        console.log("response",response)
  if (response.data.data) {
    console.log("Email Send to user");
  } else {
    
    console.log(response.data.err);
  }
    }
})

}

resetPasswordBtn.addEventListener("click", async function (e){
     console.log("hello")
    if(password.value && confirmPassword.value){
        const response = await axios.post("/api/users/resetpassword/:token", { password:password.value, confirmPassword:confirmPassword.value });
     console.log("reset password response   =", response)
     if (response.data.data) {
        alert("password reset succesfully");
      } else {
        alert("something went wrong");
        console.log(response.data.err);
      }
    }
})