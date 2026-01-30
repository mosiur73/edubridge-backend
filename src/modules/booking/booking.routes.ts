import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";

import { bookingController } from "./booking.controller";

const router = Router();


router.get("/", auth(UserRole.STUDENT, UserRole.TUTOR, UserRole.ADMIN), bookingController.getMyBookings);   //OK
router.get("/:id", auth(UserRole.STUDENT, UserRole.TUTOR, UserRole.ADMIN), bookingController.getBookingById);  //ok
router.post("/", auth(UserRole.STUDENT), bookingController.createBooking); //ok
router.patch("/:id/complete", auth(UserRole.TUTOR), bookingController.markBookingComplete);  //ok
router.patch("/:id/cancel", auth(UserRole.STUDENT, UserRole.TUTOR), bookingController.cancelBooking); //not ok

export const bookingRouter: Router = router;