import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// Create transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});

// Verify connection
transporter.verify((error, success) => {
    if (error) {
        console.error("Error connecting to email server:", error);
    } else {
        console.log("Email server is ready to send messages");
    }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Agile Desk" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });

        console.log("Message sent:", info.messageId);

    } catch (error) {
        console.error("Error sending email:", error);
    }
};

// Registration Email
async function sendRegistrationEmail(userEmail, name) {

    const subject = "Welcome to Agile Desk 🚀";

    const text = `
Hello ${name},

Thank you for registering at Agile Desk.

We are excited to have you onboard.
`;

    const html = `
<div style="
    font-family: Arial, sans-serif;
    background-color: #f4f7fb;
    padding: 40px 20px;
">

    <div style="
        max-width: 600px;
        margin: auto;
        background: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    ">

        <!-- Header -->
        <div style="
            background: #2563eb;
            padding: 30px;
            text-align: center;
            color: white;
        ">
            <h1 style="margin:0;">
                Agile Desk
            </h1>

            <p style="
                margin-top:10px;
                font-size:16px;
                opacity:0.9;
            ">
                Welcome to the platform 🚀
            </p>
        </div>

        <!-- Body -->
        <div style="padding: 40px 30px; color:#333;">

            <h2 style="margin-top:0;">
                Hello ${name},
            </h2>

            <p style="
                font-size:16px;
                line-height:1.7;
            ">
                Thank you for registering at
                <strong>Agile Desk</strong>.
            </p>

            <p style="
                font-size:16px;
                line-height:1.7;
            ">
                We are excited to have you onboard and
                can't wait for you to explore the platform.
            </p>

            <div style="text-align:center; margin:40px 0;">

                <a
                    href="https://agile-desk.vercel.app/"
                    style="
                        background:#2563eb;
                        color:white;
                        text-decoration:none;
                        padding:14px 28px;
                        border-radius:8px;
                        display:inline-block;
                        font-weight:bold;
                    "
                >
                    Get Started
                </a>

            </div>

            <p style="
                font-size:14px;
                color:#666;
                margin-top:40px;
            ">
                If you did not create this account,
                please ignore this email.
            </p>

        </div>

        <!-- Footer -->
        <div style="
            background:#f1f5f9;
            padding:20px;
            text-align:center;
            font-size:13px;
            color:#64748b;
        ">
            © 2026 Agile Desk. All rights reserved.
        </div>

    </div>

</div>
`;

    await sendEmail(userEmail, subject, text, html);
}

// Export
export { sendRegistrationEmail };