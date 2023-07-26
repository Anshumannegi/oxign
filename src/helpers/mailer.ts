// import nodemailer from "nodemailer";
// import User from "@/models/userModel";
// import bcryptjs from "bcryptjs";

// export const sendEmail = async ({ email, emailType, userId }: any) => {
//   try {
//     // create a hased token
//     const hashedToken = await bcryptjs.hash(userId.toString(), 10);

//     if (emailType === "VERIFY") {
//       await User.findByIdAndUpdate(userId, {
//         verifyToken: hashedToken,
//         verifyTokenExpiry: Date.now() + 3600000,
//       });
//     } else if (emailType === "RESET") {
//       await User.findByIdAndUpdate(userId, {
//         forgotPasswordToken: hashedToken,
//         forgotPasswordTokenExpiry: Date.now() + 3600000,
//       });
//     }
//     var transport = nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: "6180e8d55d864b",
//         pass: "********c556",
//       },
//     });

//     const mailOptions = {
//       from: "rishabhjha0@gmail.com",
//       to: email,
//       subject:
//         emailType === "VERIFY" ? "Verify your email" : "Reset your password",
//       html: `<p>Click <a href="${
//         process.env.DOMAIN
//       }/verifyemail?token=${hashedToken}">here</a> to ${
//         emailType === "VERIFY" ? "verify your email" : "reset your password"
//       }
//             or copy and paste the link below in your browser. <br> ${
//               process.env.DOMAIN
//             }/verifyemail?token=${hashedToken}
//             </p>`,
//     };

//     const mailresponse = await transport.sendMail(mailOptions);
//     return mailresponse;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

// utils/email.js
// utils/email.js
import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

// Function to generate a random verification token
export const generateVerificationToken = () => {
  return Math.random().toString(36).substr(2) + Date.now().toString(36);
};

// Function to send the verification email
export const sendVerificationEmail = async (email: any, verificationToken: any) => {
  // Replace these with your email provider settings
  const transporter = nodemailer.createTransport(
    smtpTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: 'rishabhjha0@gmail.com',
        pass: 'Jhacoony@1',
      },
    })
  );

  try {
    const info = await transporter.sendMail({
      from: 'rishabhjha0@gmail.com',
      to: email,
      subject: 'Email Verification',
      text: `Please click on the following link to verify your email: http://your-app-url/verify/${verificationToken}`,
      html: `<p>Please click on the following link to verify your email:</p><p><a href="http://your-app-url/verify/${verificationToken}">Verify Email</a></p>`,
    });

    console.log('Email sent:', info);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};


