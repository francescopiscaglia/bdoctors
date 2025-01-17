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
const sendEmail = async (doctorEmail, reviewDetails) => {

    // email content
    const emailOption = {
        from: "no-reply@bdoctors.com",
        to: doctorEmail,
        subject: "New review",
        text: `
        You have received a new review!\n\n
        Reviewer: ${reviewDetails.username}\n
        Rating ${reviewDetails.rating}\n
        Review Text: ${reviewDetails.review_text}\n\n`
    };

    // send email
    try {
        await transporter.sendMail(emailOption);
        console.log("Email sent");
    } catch (error) {
        console.error("Error in sending the email:", error);
    };
};

module.exports = sendEmail