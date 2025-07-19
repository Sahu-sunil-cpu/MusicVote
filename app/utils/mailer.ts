import nodemailer from "nodemailer"
import crypto from "crypto"
import { prismaClient } from "../lib/db";

// Create a test account or replace with real credentials.
export const sendEmail = async (email: string, emailType: "VERIFY_USER" | "RESET_PASSWORD", userId: string) => {

  try {
    const token = crypto.randomBytes(32).toString('hex');

    if (emailType == "VERIFY_USER") {
      await prismaClient.user.update({
        where: {
          id: userId
        },
        data: {
          verifyToken: token,
          verifyTokenExpiry: new Date(Date.now() + 3600000)
        }
      })
    } else if (emailType == "RESET_PASSWORD") {
      await prismaClient.user.update({
        where: {
          id: userId
        },
        data: {
          forgotPasswordToken: token,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
        }
      })
    }


   // Looking to send emails in production? Check out our Email API/SMTP product!
var transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
});

    const info = await transporter.sendMail({
      from: 'maddison53@ethereal.email',
      to: email,
      subject: emailType == "VERIFY_USER" ? "verify your email" : "Reset your password",
      // text: "Hello world?", // plain‑text body
      html: `
      <p>
      Click
       <a href="${process.env.DOMAIN}/verifyemail?token=${token}">here</a>
      to ${emailType == "VERIFY_USER" ? "verify email" : "reset your password"}
      or copy and paste the link below in your browser.
      <br>
     <a href="${process.env.DOMAIN}/verifyemail?token=${token}">${process.env.DOMAIN}/verifyemail?token=${token}</a>
      </p>
       
      `
    });

    console.log("Message sent:", info.messageId);
  } catch (error: any) {
    console.log(error)
    throw new Error(error);
  }

}


