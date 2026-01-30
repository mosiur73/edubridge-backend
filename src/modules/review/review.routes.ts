// import { Router } from "express";
// import auth, { UserRole } from "../../middleware/auth";

// import { reviewController } from "./review.controller";

// const router = Router();

// // পাবলিক রাউট: যে কেউ টিউটরের রিভিউ দেখতে পারবে
// router.get("/tutor/:tutorId", reviewController.getTutorReviews);

// // শুধুমাত্র স্টুডেন্টরা রিভিউ দিতে পারবে
// router.post("/", auth(UserRole.STUDENT), reviewController.createReview);

// // স্টুডেন্ট নিজের দেওয়া রিভিউ আপডেট করতে পারবে
// router.put("/:id", auth(UserRole.STUDENT), reviewController.updateReview);

// // স্টুডেন্ট নিজের দেওয়া রিভিউ ডিলিট করতে পারবে
// router.delete("/:id", auth(UserRole.STUDENT), reviewController.deleteReview);

// export const reviewRouter: Router = router;