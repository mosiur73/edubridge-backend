"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_1 = require("better-auth/node");
const auth_1 = require("./lib/auth");
const cors_1 = __importDefault(require("cors"));
const tutor_routes_1 = require("./modules/tutor/tutor.routes");
const booking_routes_1 = require("./modules/booking/booking.routes");
const review_routes_1 = require("./modules/review/review.routes");
const availability_routes_1 = require("./modules/availability/availability.routes");
const category_routes_1 = require("./modules/category/category.routes");
const admin_routes_1 = require("./modules/admin/admin.routes");
const app = (0, express_1.default)();
// app.use(cors({
//     origin: process.env.APP_URL || "http://localhost:3000", 
//     credentials: true
// }))
// ✅ FIXED CORS - Allow multiple origins
const allowedOrigins = [
    'http://localhost:3000', // Local dev
    'https://edubridge-client.vercel.app', // Production
    'https://edubridge-client-git-main-mosiurs-projects-799abad9.vercel.app', // Git branch
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true);
        //allow origin
        const isAllowed = allowedOrigins.some(allowed => origin === allowed) ||
            origin?.includes('edubridge-client') && origin?.includes('vercel.app');
        if (isAllowed) {
            callback(null, true);
        }
        else {
            console.log('CORS blocked origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));
app.use(express_1.default.json());
app.all("/api/auth/*splat", (0, node_1.toNodeHandler)(auth_1.auth));
app.use("/api/tutors", tutor_routes_1.tutorRouter);
app.use("/api/bookings", booking_routes_1.bookingRouter);
app.use("/api/reviews", review_routes_1.reviewRouter);
app.use("/api/availability", availability_routes_1.availabilityRouter);
app.use("/api/categories", category_routes_1.categoryRouter);
app.use("/api/admin", admin_routes_1.adminRouter);
app.get("/", (req, res) => {
    res.send("edu-bridge server is running");
});
exports.default = app;
