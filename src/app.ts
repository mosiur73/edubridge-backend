import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { tutorRouter } from "./modules/tutor/tutor.routes";
import { bookingRouter } from "./modules/booking/booking.routes";
import { reviewRouter } from "./modules/review/review.routes";
import { availabilityRouter } from "./modules/availability/availability.routes";
import { categoryRouter } from "./modules/category/category.routes";
import { adminRouter } from "./modules/admin/admin.routes";

const app: Application = express();


const allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); 
      if (isAllowed) {
        callback(null, true);
      } else {
        console.log("CORS blocked origin:", origin);
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);

app.use(express.json());

// ✅ Better Auth handler
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/tutors", tutorRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/availability", availabilityRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("edu-bridge server is running");
});

export default app;