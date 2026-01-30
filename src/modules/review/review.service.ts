import { prisma } from "../../lib/prisma";

const createReview = async (studentId: string, payload: any) => {
  const { bookingId, rating, comment } = payload;

  // Validate rating (1-5)
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  // Get booking
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      review: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Check if booking belongs to this student
  if (booking.studentId !== studentId) {
    throw new Error("You can only review your own bookings");
  }

  // Check if booking is completed
  if (booking.status !== "COMPLETED") {
    throw new Error("You can only review completed bookings");
  }

  // Check if review already exists
  if (booking.review) {
    throw new Error("You have already reviewed this booking");
  }

  // Create review
  const review = await prisma.review.create({
    data: {
      bookingId,
      tutorId: booking.tutorId,
      studentId,
      rating,
      comment,
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      booking: {
        select: {
          subject: true,
          date: true,
        },
      },
    },
  });

  // Update tutor rating
  await updateTutorRating(booking.tutorId);

  return review;
};

const getTutorReviews = async (tutorId: string) => {
  const reviews = await prisma.review.findMany({
    where: { tutorId },
    orderBy: { createdAt: "desc" },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      booking: {
        select: {
          subject: true,
          date: true,
        },
      },
    },
  });

  // Get rating distribution
  const ratingCounts = await prisma.review.groupBy({
    by: ["rating"],
    where: { tutorId },
    _count: {
      rating: true,
    },
  });

  const ratingDistribution: any = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  ratingCounts.forEach((item) => {
    ratingDistribution[item.rating] = item._count.rating;
  });

  return {
    reviews,
    ratingDistribution,
  };
};

const updateReview = async (reviewId: string, studentId: string, data: any) => {
  const { rating, comment } = data;

  // Validate rating if provided
  if (rating !== undefined && (rating < 1 || rating > 5)) {
    throw new Error("Rating must be between 1 and 5");
  }

  // Get review
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  // Check if review belongs to this student
  if (review.studentId !== studentId) {
    throw new Error("You can only update your own reviews");
  }

  // Update review
  const updatedReview = await prisma.review.update({
    where: { id: reviewId },
    data: {
      rating: rating !== undefined ? rating : review.rating,
      comment: comment !== undefined ? comment : review.comment,
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      booking: {
        select: {
          subject: true,
          date: true,
        },
      },
    },
  });

  // Update tutor rating if rating changed
  if (rating !== undefined && rating !== review.rating) {
    await updateTutorRating(review.tutorId);
  }

  return updatedReview;
};

const deleteReview = async (reviewId: string, studentId: string) => {
  // Get review
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  // Check if review belongs to this student
  if (review.studentId !== studentId) {
    throw new Error("You can only delete your own reviews");
  }

  // Delete review
  await prisma.review.delete({
    where: { id: reviewId },
  });

  // Update tutor rating
  await updateTutorRating(review.tutorId);

  return true;
};

// Helper function to update tutor rating
const updateTutorRating = async (tutorId: string) => {
  // Get all reviews for this tutor
  const reviews = await prisma.review.findMany({
    where: { tutorId },
    select: { rating: true },
  });

  if (reviews.length === 0) {
    await prisma.tutorProfile.update({
      where: { id: tutorId },
      data: {
        rating: 0,
        totalReviews: 0,
      },
    });
    return;
  }

  // Calculate average rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  // Update tutor profile
  await prisma.tutorProfile.update({
    where: { id: tutorId },
    data: {
      rating: averageRating,
      totalReviews: reviews.length,
    },
  });
};

export const reviewService = {
  createReview,
  getTutorReviews,
  updateReview,
  deleteReview,
};