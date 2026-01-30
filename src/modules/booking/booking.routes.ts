import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";

import { bookingController } from "./booking.controller";

const router = Router();

// // all user(Student, Tutor, Admin)self booking list
router.get("/", auth(UserRole.STUDENT, UserRole.TUTOR, UserRole.ADMIN), bookingController.getMyBookings);   //OK

// // নির্দিষ্ট বুকিং ডিটেইলস দেখা
// router.get("/:id", auth(UserRole.STUDENT, UserRole.TUTOR, UserRole.ADMIN), bookingController.getBookingById);

// only student booking tutor
router.post("/", auth(UserRole.STUDENT), bookingController.createBooking); //ok

// // শুধুমাত্র টিউটর সেশন কমপ্লিট মার্ক করতে পারবে
// router.patch("/:id/complete", auth(UserRole.TUTOR), bookingController.markBookingComplete);

// // স্টুডেন্ট এবং টিউটর উভয়ই ক্যানসেল করতে পারবে
// router.patch("/:id/cancel", auth(UserRole.STUDENT, UserRole.TUTOR), bookingController.cancelBooking);

export const bookingRouter: Router = router;