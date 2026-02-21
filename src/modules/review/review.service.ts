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
  // await updateTutorRating(booking.tutorId);

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



export const reviewService = {
  createReview,
  getTutorReviews,

};