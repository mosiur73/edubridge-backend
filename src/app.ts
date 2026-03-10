import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';
import { tutorRouter } from "./modules/tutor/tutor.routes";
// ... other imports

const app: Application = express();

// ✅ CORS
const allowedOrigins = [
  'http://localhost:3000',
  'https://edubridge-client.vercel.app',
  'https://edubridge-client-git-main-mosiurs-projects-799abad9.vercel.app',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));

app.use(express.json());

// ✅ Better Auth routes
app.all("/api/auth/*", toNodeHandler(auth));

// ✅ CRITICAL: Cookie middleware - Add this AFTER auth routes
app.use((req, res, next) => {
  const originalSetCookie = res.setHeader.bind(res);
  res.setHeader = function(name: string, value: any) {
    if (name.toLowerCase() === 'set-cookie') {
      if (Array.isArray(value)) {
        value = value.map((cookie: string) => {
          // Add SameSite=None and Secure for cross-origin
          if (cookie.includes('better-auth') && !cookie.includes('SameSite=None')) {
            return cookie + '; SameSite=None; Secure';
          }
          return cookie;
        });
      } else if (typeof value === 'string') {
        if (value.includes('better-auth') && !value.includes('SameSite=None')) {
          value = value + '; SameSite=None; Secure';
        }
      }
    }
    return originalSetCookie(name, value);
  };
  next();
});

// ✅ Other routes
app.use("/api/tutors", tutorRouter);
// ... rest of routes

export default app;