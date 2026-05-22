import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // your email
    pass: process.env.GMAIL_USER, // app password (NOT normal password)
  },
});
