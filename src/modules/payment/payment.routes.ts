import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { paymentController } from "./payment.controller";

const router = Router();

// Create payment intent + pending booking
router.post("/create-intent", auth(UserRole.STUDENT), paymentController.createPaymentIntent);

// Confirm payment after Stripe success
router.post("/confirm", auth(UserRole.STUDENT), paymentController.confirmPayment);

// Cancel pending booking
router.post("/cancel", auth(UserRole.STUDENT), paymentController.cancelPendingBooking);

export const paymentRouter: Router = router;