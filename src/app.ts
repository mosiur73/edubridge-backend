import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';
import { tutorRouter } from "./modules/tutor/tutor.routes";

const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:3000", 
    credentials: true
}))

app.use(express.json());

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/tutor", tutorRouter)

app.get("/", (req, res) => {
    res.send("edu-bridge server is running");
});

export default app;