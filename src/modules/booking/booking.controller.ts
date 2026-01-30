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






export const bookingController = {
  createBooking,
//   getMyBookings,
//   getBookingById,
//   markBookingComplete,
//   cancelBooking,
};
