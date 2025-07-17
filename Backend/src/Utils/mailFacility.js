import nodemailer from "nodemailer"

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "shubhambadsha8401@gmail.com",
        pass: 'vivz njhv irlw mwwk',
    },
});

// Wrap in an async IIFE so we can use await.

export async function sendMail(to, otpToken) {
    try {
        const info = await transporter.sendMail({
        from: '"Learning Testing Mail Send" <shubhambadsha8401@gmail.com>',
        to: `${to}`,
        subject: "Verification Of Email From Testing",
        text: "Hello world?", // plain‑text body
        html: `
                <h1>Your Otp Is : <h1>
                <h1>${otpToken}<h1>
            `,
    });

    console.log("mail successfully send" , info)
    } catch (error) {
        next(error);
    }

}
