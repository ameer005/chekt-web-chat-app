const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.sendActivationCode = async (name, email, activationCode) => {
  try {
    const mailOptions = {
      from: "MangaTea",
      to: email,
      subject: "Please activate your account",
      html: `<h1>Account Activation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for signing up. Please activate your account by verifying the otp.</p>
        <h1>${activationCode}<h1>
        </div>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("nodemailer error");
    console.log(err);
  }
};

exports.sendForgotPasswordCode = async (name, email, resetPasswordCode) => {
  try {
    const mailOptions = {
      from: "MangaTea",
      to: email,
      subject: "Password Reset Code",
      html: `<h1>Forgot Password</h1>
        <h2>Hello , ${name}</h2>
        <p>Your password reset code is</p>
        <h1>${resetPasswordCode}<h1>
        </div>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("nodemailer error");
    console.log(err);
  }
};

exports.sendNewPassword = async (name, email, password) => {
  try {
    const mailOptions = {
      from: "MangaTea",
      to: email,
      subject: "New Password",
      html: `<h1>New Password Generate</h1>
        <h2>Hello , ${name}</h2>
        <p>Your new password is </p>
        <h1>${password}<h1>
        </div>`,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("nodemailer error");
    console.log(err);
  }
};
