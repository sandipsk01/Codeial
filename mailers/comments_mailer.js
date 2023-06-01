// const nodeMailer = require('../config/nodemailer');


// // this is another way of exporting a method
// exports.newComment = (comment) => {
//     let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

//     nodeMailer.transporter.sendMail({
//        from: 'sandipkalekar808@gmail.com',
//        to: comment.user.email,
//        subject: "New Comment Published!",
//        html: htmlString
//     }, (err, info) => {
//         if (err){
//             console.log('Error in sending mail', err);
//             return;
//         }

//         console.log('Message sent', info);
//         return;
//     });
// }



const nodemailer = require("../config/nodemailer");

exports.newComment = async (comment) => {
  try {
    const htmlString = await nodemailer.renderTemplate({ comment }, "/comments/new_comments.ejs");

    await nodemailer.transporter.sendMail({
      from: "sandipkalekar808@gmail.com",
      to: comment.user.email,
      subject: "New Comment Published!",
      html: htmlString,
    });

    console.log("Message sent successfully");
  } catch (error) {
    console.log("Error in sending mail", error);
  }
};