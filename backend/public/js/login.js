

const loginEmail=document.querySelector("#loginEmail")
const loginPasword=document.querySelector("#loginPassword")
const loginBtn= document.querySelector("#loginBtn")
const forgetPw= document.querySelector("#forgetPw")
const message=document.querySelector("#message");



forgetPw.addEventListener("click" , function(){

  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service:"gmail",
      host: "smtp.gmail.email",
     
      secure: false, // true for 465, false for other ports
      auth: {
        user: "ld.ladakh@gmail.com", // generated ethereal user
        pass: "exnehttpfrodvibs", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"ld.ladakh@gmail.com', // sender address
      to: "teamlcg2017@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);

})


 
  loginBtn.addEventListener("click" , async function(e){
    
    
    try{
        e.preventDefault(); // prevent page refresh
        if(loginEmail.value && loginPasword.value){
           let  obj = await axios.post( "http://localhost:3000/api/users/login" , {email:loginEmail.value , password:loginPasword.value});
            console.log("object" , obj);
            message.innerHTML = "";
            if(obj.data.data){
                window.location.href = "/home";
            }else{
                message.innerHTML = obj.data.message;
            }
        }
    }
    catch(error){
      message.innerHTML = obj.message;
        console.log(error);
    }
})
