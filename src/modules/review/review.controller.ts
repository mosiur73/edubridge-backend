import { Request, Response } from "express";
import { reviewService } from "./review.service";

// POST /api/reviews
const createReview = async (req: Request, res: Response) => {
  try {
    const studentId = req.user!.id;
    const payload = req.body;

    const review = await reviewService.createReview(studentId, payload);

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/reviews/tutor/:tutorId
const getTutorReviews = async (req: Request, res: Response) => {
  try {
    const { tutorId } = req.params;

    if (!tutorId || typeof tutorId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid tutor id",
      });
    }

    const reviews = await reviewService.getTutorReviews(tutorId);

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PUT /api/reviews/:id
const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;


    const studentId = req.user!.id;
    const data = req.body;

    const review = await reviewService.updateReview(id as string, studentId, data);

    res.json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /api/reviews/:id
const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const studentId = req.user!.id;

    await reviewService.deleteReview(id as string, studentId);

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const reviewController = {
  createReview,
  getTutorReviews,
  updateReview,
  deleteReview,
};