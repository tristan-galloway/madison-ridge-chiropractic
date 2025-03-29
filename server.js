import express from 'express';
import dotenv from 'dotenv';
import { createTransport } from 'nodemailer';
import cors from 'cors';
import { formatPhoneNumber, getCurrentDateTime } from './src/scripts/utilities.js';

dotenv.config();
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

const allowedOrigins = [
    'http://localhost:5173', // Vite Dev Server
    'https://madisonridgechiropractic.onrender.com/' // Replace with your actual deployed front-end URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    }
}));

app.post('/send-appointment-request', async (req, res) => {
    const { firstName, lastName, phone, email, dayOfWeek, timeOfDay } = req.body;

    // Configure transporter with environment variables
    const transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_FROM,   // Email from .env
            pass: process.env.EMAIL_PASS,   // Password from .env
        },
    });

    const formattedPhone = formatPhoneNumber(phone);
    const currentDate = getCurrentDateTime();

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: `New Appointment Request | ${currentDate}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                <h2 style="color: #710203; border-bottom: 2px solid #525252; padding-bottom: 10px;">New Appointment Request</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Phone:</strong> ${formattedPhone}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Preferred Day(s):</strong> ${dayOfWeek}</p>
                <p><strong>Preferred Time(s):</strong> ${timeOfDay}</p>
                <hr style="border: 0; border-top: 1px solid #ccc;">
                <p style="font-size: 12px; color: #7f8c8d;">This is an automated email. Please do not reply.</p>
            </div>
        `,
    };    

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Appointment request sent successfully!" }); // ✅ Send JSON response
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Error sending email" }); // ✅ Return JSON error response
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
