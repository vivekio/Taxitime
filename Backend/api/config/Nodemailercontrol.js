const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pankhaniyavivek10@gmail.com', // your email
        pass: 'agxcizjuuvwxfstn'   // your email password
    }
});

module.exports = transporter;

