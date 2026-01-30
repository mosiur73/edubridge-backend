// import { Router } from "express";
// import auth, { UserRole } from "../../middleware/auth";

// import { bookingController } from "./booking.controller";

// const router = Router();

// // সব রোলের ইউজাররাই (Student, Tutor, Admin) তাদের বুকিং লিস্ট দেখতে পারবে
// router.get("/", auth(UserRole.STUDENT, UserRole.TUTOR, UserRole.ADMIN), bookingController.getMyBookings);

// // নির্দিষ্ট বুকিং ডিটেইলস দেখা
// router.get("/:id", auth(UserRole.STUDENT, UserRole.TUTOR, UserRole.ADMIN), bookingController.getBookingById);

// // শুধুমাত্র স্টুডেন্ট বুকিং করতে পারবে
// router.post("/", auth(UserRole.STUDENT), bookingController.createBooking);

// // শুধুমাত্র টিউটর সেশন কমপ্লিট মার্ক করতে পারবে
// router.patch("/:id/complete", auth(UserRole.TUTOR), bookingController.markBookingComplete);

// // স্টুডেন্ট এবং টিউটর উভয়ই ক্যানসেল করতে পারবে
// router.patch("/:id/cancel", auth(UserRole.STUDENT, UserRole.TUTOR), bookingController.cancelBooking);

// export const bookingRouter: Router = router;