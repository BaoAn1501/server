const nodemailer = require("nodemailer");
require('dotenv/config');
const mailConfig = require('../config/mail.config');

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: "baoan3108nttv@gmail.com",
                pass: "dpbbclgmrqydnxov",
            },
        });
        console.log('email send: ', email);
        await transporter.sendMail({
            from: "baoan3108nttv@gmail.com",
            to: email,
            subject: subject,
            text: text,
        });
        console.log("Email đã được gửi đi");
    } catch (error) {
        console.log(error, "Email chưa được gửi " + error);
    }
};

module.exports = sendEmail;