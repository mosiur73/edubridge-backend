import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { bookingController } from "./booking.controller";
const router = Router();
router.get("/", auth(UserRole.STUDENT, UserRole.TUTOR, UserRole.ADMIN), bookingController.getMyBookings);
router.get("/:id", auth(UserRole.STUDENT, UserRole.TUTOR, UserRole.ADMIN), bookingController.getBookingById);
router.post("/", auth(UserRole.STUDENT), bookingController.createBooking);
router.patch("/:id/complete", auth(UserRole.TUTOR), bookingController.markBookingComplete);
router.patch("/:id/cancel", auth(UserRole.STUDENT, UserRole.TUTOR), bookingController.cancelBooking);
export const bookingRouter = router;
//# sourceMappingURL=booking.routes.js.map