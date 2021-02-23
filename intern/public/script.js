


const registerBtn=document.querySelector("#registerBtn")
const signupName=document.querySelector("#signupName")
const signupEmail=document.querySelector("#signupEmail")
const signupPw=document.querySelector("#signupPw")

const loginBtn=document.querySelector("#loginBtn")
const loginName=document.querySelector("#loginName")
const loginEmail=document.querySelector("#loginEmail")



loginBtn.addEventListener("click", async function(req,res){
try{
    let loginObj = {
       
        "email":loginEmail.value,
        "password":loginPw.value
    }

    let obj =  await axios.post("http://localhost:3000/api/getUser", loginObj)
    console.log("obj" , obj)
    if(obj.data.data){
      alert(obj.data.message) ;
    }else{
       alert(obj.data.message);
    }
    }
        catch(error){
            console.log(error)
        }

})


registerBtn.addEventListener("click", async function(req,res){
    console.log("hello")
    
    try{
let registerObj = {
    "name":signupName.value,
    "email":signupEmail.value,
    "password":signupPw.value
}

let obj =  await axios.post("http://localhost:3000/api/createUser", registerObj)
console.log("obj" , obj)
if(obj.data.data){
    window.location.href = "/home";
}else{
    message.innerHTML = obj.data.message;
}
}
    catch(error){
        console.log(error)
    }
})