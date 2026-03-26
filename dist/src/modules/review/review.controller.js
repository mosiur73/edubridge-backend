// import { Request, Response } from "express";
// import { reviewService } from "./review.service";
import { reviewService } from "./review.service";
// POST /api/reviews
const createReview = async (req, res) => {
    try {
        const studentId = req.user.id;
        const payload = req.body;
        // Basic validation
        if (!payload.bookingId) {
            return res.status(400).json({
                success: false,
                message: "bookingId is required",
            });
        }
        if (!payload.rating) {
            return res.status(400).json({
                success: false,
                message: "rating is required",
            });
        }
        const review = await reviewService.createReview(studentId, payload);
        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: review,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
// GET /api/reviews/tutor/:tutorId
const getTutorReviews = async (req, res) => {
    try {
        const { tutorId } = req.params;
        if (!tutorId || typeof tutorId !== "string") {
            return res.status(400).json({
                success: false,
                message: "Invalid tutor id",
            });
        }
        const reviews = await reviewService.getTutorReviews(tutorId);
        res.status(200).json({
            success: true,
            data: reviews,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const reviewController = {
    createReview,
    getTutorReviews,
};
//# sourceMappingURL=review.controller.js.map