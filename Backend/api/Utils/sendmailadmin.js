const transporter = require("../config/Nodemailercontrol");
const db = require("../config/dbconnection");

const sendEmail = (contactData, callback) => {
  console.log( "this is contact data" , contactData);
  
  db.query("SELECT email FROM admins", (dbError, results) => {
    if (dbError) return callback(dbError);
    
    if (!results || results.length === 0) {
      return callback(new Error("No admin emails found in the database"));
    }
    
    const adminEmails = results.map(admin => admin.email);
    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1); margin-top: 40px;">
          <tr>
            <td style="padding: 25px 0; text-align: center; background-color: #3498db;">
              <h1 style="color: white; margin: 0;">New Contact Inquiry</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;">
                    <strong style="font-size: 16px; color: #333333;">Sender Name:</strong>
                    <p style="margin: 5px 0 0 0; font-size: 16px; color: #666666;">${contactData.name || 'Not provided'}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;">
                    <strong style="font-size: 16px; color: #333333;">Email Address:</strong>
                    <p style="margin: 5px 0 0 0; font-size: 16px; color: #666666;">${contactData.email || 'Not provided'}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;">
                    <strong style="font-size: 16px; color: #333333;">Subject:</strong>
                    <p style="margin: 5px 0 0 0; font-size: 16px; color: #666666;">${contactData.subject || 'Not provided'}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <strong style="font-size: 16px; color: #333333;">Message:</strong>
                    <p style="margin: 5px 0 0 0; font-size: 16px; color: #666666; line-height: 1.5;">${contactData.message || 'Not provided'}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 30px; background-color: #f5f5f5; text-align: center;">
              <p style="margin: 0; font-size: 14px; color: #777777;">This is an automated message from your website's contact form.</p>
              <p style="margin: 10px 0 0 0; font-size: 14px; color: #777777;">Submitted on: ${new Date().toLocaleString()}</p>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;

    // Create mail options
    const mailOptions = {
      from: "pankhaniyavivek10@gmail.com",
      to: adminEmails.join(", "),
      subject: `New Contact Form Submission: ${contactData.subject || 'No Subject'}`,
      text: `
        New contact form submission:
        Name: ${contactData.name || 'Not provided'}
        Email: ${contactData.email || 'Not provided'}
        Subject: ${contactData.subject || 'Not provided'}
        Message: ${contactData.message || 'Not provided'}
      `,
      html: htmlContent
    };
    
    // Send the email
    transporter.sendMail(mailOptions, (error) => {
      if (error) return callback(error);
      callback(null);
    });
  });
};

module.exports = sendEmail;