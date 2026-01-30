import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";

import { reviewController } from "./review.controller";

const router = Router();


router.get("/tutor/:tutorId", reviewController.getTutorReviews);
router.post("/", auth(UserRole.STUDENT), reviewController.createReview);
router.put("/:id", auth(UserRole.STUDENT), reviewController.updateReview);
router.delete("/:id", auth(UserRole.STUDENT), reviewController.deleteReview);

export const reviewRouter: Router = router;