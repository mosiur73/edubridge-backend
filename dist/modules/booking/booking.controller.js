"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_service_1 = require("./booking.service");
// POST /api/bookings
const createBooking = async (req, res) => {
    try {
        const studentId = req.user.id;
        const payload = req.body;
        const booking = await booking_service_1.bookingService.createBooking(studentId, payload);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
// GET /api/bookings
const getMyBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const userRole = req.user.role;
        const { status } = req.query;
        const bookings = await booking_service_1.bookingService.getMyBookings(userId, userRole, status);
        res.json({
            success: true,
            data: bookings,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// GET /api/bookings/:id
const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;
        if (!id || typeof id !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid booking id",
            });
        }
        const booking = await booking_service_1.bookingService.getBookingById(id, userId, userRole);
        res.json({
            success: true,
            data: booking,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
// PATCH /api/bookings/:id/complete
const markBookingComplete = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const booking = await booking_service_1.bookingService.markComplete(id, userId);
        res.json({
            success: true,
            message: "Booking marked as completed",
            data: booking,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
// PATCH /api/bookings/:id/cancel
const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const userRole = req.user.role;
        const booking = await booking_service_1.bookingService.cancelBooking(id, userId, userRole);
        res.json({
            success: true,
            message: "Booking cancelled successfully",
            data: booking,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.bookingController = {
    createBooking,
    getMyBookings,
    getBookingById,
    markBookingComplete,
    cancelBooking,
};
