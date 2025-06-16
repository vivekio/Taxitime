
const sendEmail = require("../../Utils/sendmailadmin");

const contactsendemail = (req, res) => {
    const { fullname, email, subject, message } = req.body;
    console.log( "this is data",req.body);
    
    const contactFormData = {
        name: fullname,
        email: email,
        subject: subject,
        message: message
      };

    sendEmail(contactFormData, (err, result) => {
        if (err) {
            console.error("Error sending email:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "Email sent successfully" });
    });
};  

module.exports = { contactsendemail };