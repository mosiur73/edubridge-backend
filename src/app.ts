import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';
import { tutorRouter } from "./modules/tutor/tutor.routes";
import { bookingRouter } from "./modules/booking/booking.routes";
import { reviewRouter } from "./modules/review/review.routes";
import { availabilityRouter } from "./modules/availability/availability.routes";
import { categoryRouter } from "./modules/category/category.routes";
import { adminRouter } from "./modules/admin/admin.routes";

const app: Application = express();

// app.use(cors({
//     origin: process.env.APP_URL || "http://localhost:3000", 
//     credentials: true
// }))
// ✅ FIXED CORS - Allow multiple origins
const allowedOrigins = [
    'http://localhost:3000',                          // Local dev
    'https://edubridge-client.vercel.app',           // Production
    'https://edubridge-client-git-main-mosiurs-projects-799abad9.vercel.app',  // Git branch
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like Postman, mobile apps)
        if (!origin) return callback(null, true);
        
        // Check if origin is in allowed list or matches pattern
        const isAllowed = allowedOrigins.some(allowed => origin === allowed) || 
                         origin?.includes('edubridge-client') && origin?.includes('vercel.app');
        
        if (isAllowed) {
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/tutors", tutorRouter)
app.use("/api/bookings",bookingRouter)
app.use("/api/reviews",reviewRouter)
app.use("/api/availability", availabilityRouter)
app.use("/api/categories",categoryRouter)
app.use("/api/admin",adminRouter)



app.get("/", (req, res) => {
    res.send("edu-bridge server is running");
});

export default app;