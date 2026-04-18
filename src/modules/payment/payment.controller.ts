import { Request, Response } from "express";
import { paymentService } from "./payment.service";

// POST /api/payment/create-intent
const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const studentId = req.user!.id;
    const payload = req.body;

    const result = await paymentService.createPaymentIntent(studentId, payload);

    res.status(201).json({
      success: true,
      message: "Payment intent created",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// POST /api/payment/confirm
const confirmPayment = async (req: Request, res: Response) => {
  try {
    const studentId = req.user!.id;
    const { bookingId } = req.body;

    const booking = await paymentService.confirmPayment(bookingId, studentId);

    res.json({
      success: true,
      message: "Payment confirmed! Booking is now active.",
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// POST /api/payment/cancel
const cancelPendingBooking = async (req: Request, res: Response) => {
  try {
    const studentId = req.user!.id;
    const { bookingId } = req.body;

    const booking = await paymentService.cancelPendingBooking(bookingId, studentId);

    res.json({
      success: true,
      message: "Booking cancelled",
      data: booking,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const paymentController = {
  createPaymentIntent,
  confirmPayment,
  cancelPendingBooking,
};