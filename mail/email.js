import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    // create transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // mail data options
    const mailOptions = {
        from: "Hotel Valhalla <admin@valhalla.com>",
        to: options.email,
        subject: options.subject,
        text: options.body,
    };

    // send email
    await transporter.sendEmail(mailOptions);
};

export default sendEmail;
