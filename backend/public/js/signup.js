const signupName=document.querySelector("#signupName")
const signupEmail=document.querySelector("#signupEmail")
const signupPassword=document.querySelector("#signupPassword")
const signupConfirmPassword=document.querySelector("#signupConfirmPassword")
const message=document.querySelector("#message")

const signupBtn=document.querySelector("#signupBtn");


signupBtn.addEventListener("click", async function(e){
    e.preventDefault();
console.log(signupPassword.value)
    try{


if(signupName.value && signupEmail.value && signupPassword.value && signupConfirmPassword.value){
   
    let signupObject = {
            "name":signupName.value,
            "email":signupEmail.value,
            "password":signupPassword.value,
            "confirmPassword":signupConfirmPassword.value
        }
        let obj = await axios.post("http://localhost:3000/api/users/signup" , signupObject)
  console.log(obj)
message.innerHTML=" "
  if(obj.data.data){
    window.location.href = "/home";
}else{
    message.innerHTML = obj.data.message;
}

}
    }
   

    catch(error){

console.log(error)
    }
     
})