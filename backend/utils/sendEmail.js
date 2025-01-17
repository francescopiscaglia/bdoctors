const nodemailer = require("nodemailer");

// transport
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

// send email
const sendEmail = (doctorEmail, reviewDetails) => {

    // email content
    const emailOption = {
        from: reviewDetails.email,
        to: doctorEmail,
        subject: "New review",
        text: `
        You have received a new review!\n\n
        Reviewer: ${reviewDetails.username}\n
        Rating ${reviewDetails.rating}\n
        Review Text ${reviewDetails.review_text}\n\n`
    };

    // send email
    transporter.sendMail(emailOption, (err, info) => {
        if (err) {
            console.error("Error in sending the email:", err);
        } else {
            console.log("Email send:", info.response);
        };
    });
};

module.exports = sendEmail