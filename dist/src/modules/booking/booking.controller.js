import { bookingService } from "./booking.service";
// POST /api/bookings
const createBooking = async (req, res) => {
    try {
        const studentId = req.user.id;
        const payload = req.body;
        const booking = await bookingService.createBooking(studentId, payload);
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
        const bookings = await bookingService.getMyBookings(userId, userRole, status);
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
        const booking = await bookingService.getBookingById(id, userId, userRole);
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
        const booking = await bookingService.markComplete(id, userId);
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
        const booking = await bookingService.cancelBooking(id, userId, userRole);
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
export const bookingController = {
    createBooking,
    getMyBookings,
    getBookingById,
    markBookingComplete,
    cancelBooking,
};
//# sourceMappingURL=booking.controller.js.map