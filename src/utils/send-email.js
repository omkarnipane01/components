// This is the node js code which is used for sending email from server

import nodemailer from "nodemailer";
console.log("Send an email form server");

let transporter = nodemailer.createTransport({
  service: "mail.ynorme.com",
  port: 465,
//   secure: true,
  auth: {
    user: "no-reply@ynorme.com",
    pass: "n{Kr]{t8bMpo",
  },
});

let mailOptions = {
  from: "omkaralot@gmail.com",
  to: "omkar@alotsolutions.com",
  subject: "Learning Sending Email using Node.js",
  text: "This is a sample email for learning how to sending emails using node js from server!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.error("Error while sedning email ", error);
  } else {
    console.log("Email sent: " + info);
  }
});
