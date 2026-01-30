import { Request, Response } from "express";
import { bookingService } from "./booking.service";

// POST /api/bookings
const createBooking = async (req: Request, res: Response) => {
  try {
    const studentId = req.user!.id;
    const payload = req.body;

    const booking = await bookingService.createBooking(studentId, payload);

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/bookings
const getMyBookings = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const userRole = req.user!.role;
    const { status } = req.query;

    const bookings = await bookingService.getMyBookings(userId, userRole, status as string);

    res.json({
      success: true,
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// GET /api/bookings/:id
const getBookingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

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
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};


// PATCH /api/bookings/:id/complete
const markBookingComplete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const booking = await bookingService.markComplete(id as string, userId);

    res.json({
      success: true,
      message: "Booking marked as completed",
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


// PATCH /api/bookings/:id/cancel
const cancelBooking = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    const booking = await bookingService.cancelBooking(id as string, userId, userRole);

    res.json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (error: any) {
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
