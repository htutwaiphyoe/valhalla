import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    // create transporter

    // mailtrap
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // sendgrid
    // const transporter = nodemailer.createTransport({
    //     service: "SendGrid",
    //     auth: {
    //         user: process.env.SENDGRID_USERNAME,
    //         pass: process.env.SENDGRID_PASSWORD,
    //     },
    // });

    // mail data options
    const mailOptions = {
        from: `Hotel Valhalla <${process.env.SENDER_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.body,
    };

    // send email
    await transporter.sendMail(mailOptions);
};

export default sendEmail;
