const transporter = require("../config/Nodemailercontrol");

// const sendEmail = (to, subject, text, callback) => {
//   const mailOptions = {
//     from: "pankhaniyavivek10@gmail.com",
//     to,
//     subject,
//     text,
//   };

//   transporter.sendMail(mailOptions, (error) => {
//     if (error) return callback(error);
//     callback(null);
//   });
// };

const sendEmail = (to, subject, text, type, data, callback) => {
  // Choose the appropriate template based on the email type
  let htmlContent;
  
  if (type === "otp") {
    htmlContent = createOTPTemplate(data.otp);
  } else if (type === "password") {
    htmlContent = createPasswordTemplate(data.password, data.username);
  } else {
    // Fallback to basic template
    htmlContent = `<div style="font-family: Arial, sans-serif; padding: 20px;">${text}</div>`;
  }

  const mailOptions = {
    from: "pankhaniyavivek10@gmail.com",
    to,
    subject,
    text, // Plain text version as fallback
    html: htmlContent // HTML version
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) return callback(error);
    callback(null);
  });
};

const createOTPTemplate = (otp, username = "User") => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verification Code</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin-top: 40px;">
        <tr>
          <td style="padding: 20px 0; text-align: center; background-color:rgb(231, 191, 10);">
            <h1 style="color: white; margin: 0;">Verification Code</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 30px;">
            <p style="margin-top: 0; font-size: 16px; line-height: 24px; color: #333;">Hello ${username},</p>
            <p style="font-size: 16px; line-height: 24px; color: #333;">Thank you for using our service. Your verification code is:</p>
            <div style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin: 20px 0; text-align: center; border-radius: 5px;">
              <h2 style="margin: 0; color:rgb(255, 208, 0); letter-spacing: 5px; font-size: 32px;">${otp}</h2>
            </div>
            <p style="font-size: 16px; line-height: 24px; color: #333;">This code will expire in 10 minutes for security reasons.</p>
            <p style="font-size: 16px; line-height: 24px; color: #333;">If you didn't request this code, please ignore this email.</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 30px; background-color: #f5f5f5; text-align: center; font-size: 12px; color: #777;">
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} Hexagon infosoft solutions pvt ltd. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">Please do not reply to this automated message.</p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};

// Template for Password emails
const createPasswordTemplate = (password, username = "User") => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your New Password</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin-top: 40px;">
        <tr>
          <td style="padding: 20px 0; text-align: center; background-color:rgb(231, 191, 10);;">
            <h1 style="color: white; margin: 0;">Your New Password</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 30px;">
            <p style="margin-top: 0; font-size: 16px; line-height: 24px; color: #333;">Hello ${username},</p>
            <p style="font-size: 16px; line-height: 24px; color: #333;">Your account password has been reset. Here is your new password:</p>
            <div style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 15px; margin: 20px 0; text-align: center; border-radius: 5px;">
              <h2 style="margin: 0; color: rgb(231, 191, 10);; font-family: monospace; font-size: 24px;">${password}</h2>
            </div>
            <p style="font-size: 16px; line-height: 24px; color: #333;">For security reasons, we recommend you change this password after logging in.</p>
            <p style="font-size: 16px; line-height: 24px; color: #333;">If you didn't request this password reset, please contact our support team immediately.</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 20px 30px; background-color: #f5f5f5; text-align: center; font-size: 12px; color: #777;">
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} HExagon infosoft solutions pvt ltd. All rights reserved.</p>
            <p style="margin: 5px 0 0 0;">Please do not reply to this automated message.</p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};

module.exports = sendEmail;
