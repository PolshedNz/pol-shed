const nodemailer = require("nodemailer");

exports.sendVerificationEmail = async (email, token) => {
    console.log("generation verification email ")
    
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verifyUrl = `${process.env.BASE_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: '"Poleshed" <no-reply@vivid.com>',
    to: email,
    subject: "Email Verification",
    html: `<p>Please verify your email by clicking the link below:</p><a href="${verifyUrl}">Verify Email</a>`,
  });
};
