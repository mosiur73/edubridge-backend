import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';
import { tutorRouter } from "./modules/tutor/tutor.routes";
import { bookingRouter } from "./modules/booking/booking.routes";
import { reviewRouter } from "./modules/review/review.routes";
import { availabilityRouter } from "./modules/availability/availability.routes";

const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000", 
    credentials: true
}))

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/tutor", tutorRouter)
app.use("/api/bookings",bookingRouter)
app.use("/api/reviews",reviewRouter)
app.use("/api/availability", availabilityRouter)

app.get("/", (req, res) => {
    res.send("edu-bridge server is running");
});

export default app;