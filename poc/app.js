const express = require("express");

const app = express();
const nodemailer=require("nodemailer")
async function main() {
  
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
      from: 'ld.ladakh@gmail.comEVERYONE', // sender address
      to: "teamlcg2017@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "hello, this is lundup dorjay from lundup.vijra@gmail.com", // plain text body
      // html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);





app.listen(5000, function () {
  console.log("server started at port 3000");
});