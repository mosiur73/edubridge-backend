"use strict";
// import { prisma } from "../../lib/prisma";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
// const createReview = async (studentId: string, payload: any) => {
//   const { bookingId, rating, comment } = payload;
//   // Validate rating (1-5)
//   if (rating < 1 || rating > 5) {
//     throw new Error("Rating must be between 1 and 5");
//   }
//   // Get booking
//   const booking = await prisma.booking.findUnique({
//     where: { id: bookingId },
//     include: {
//       review: true,
//     },
//   });
//   if (!booking) {
//     throw new Error("Booking not found");
//   }
//   // Check if booking belongs to this student
//   if (booking.studentId !== studentId) {
//     throw new Error("You can only review your own bookings");
//   }
//   // Check if booking is completed
//   if (booking.status !== "COMPLETED") {
//     throw new Error("You can only review completed bookings");
//   }
//   // Check if review already exists
//   if (booking.review) {
//     throw new Error("You have already reviewed this booking");
//   }
//   // Create review
//   const review = await prisma.review.create({
//     data: {
//       bookingId,
//       tutorId: booking.tutorId,
//       studentId,
//       rating,
//       comment,
//     },
//     include: {
//       student: {
//         select: {
//           id: true,
//           name: true,
//           image: true,
//         },
//       },
//       booking: {
//         select: {
//           subject: true,
//           date: true,
//         },
//       },
//     },
//   });
//   // Update tutor rating
//   // await updateTutorRating(booking.tutorId);
//   return review;
// };
// const getTutorReviews = async (tutorId: string) => {
//   const reviews = await prisma.review.findMany({
//     where: { tutorId },
//     orderBy: { createdAt: "desc" },
//     include: {
//       student: {
//         select: {
//           id: true,
//           name: true,
//           image: true,
//         },
//       },
//       booking: {
//         select: {
//           subject: true,
//           date: true,
//         },
//       },
//     },
//   });
//   // Get rating distribution
//   const ratingCounts = await prisma.review.groupBy({
//     by: ["rating"],
//     where: { tutorId },
//     _count: {
//       rating: true,
//     },
//   });
//   const ratingDistribution: any = {
//     5: 0,
//     4: 0,
//     3: 0,
//     2: 0,
//     1: 0,
//   };
//   ratingCounts.forEach((item) => {
//     ratingDistribution[item.rating] = item._count.rating;
//   });
//   return {
//     reviews,
//     ratingDistribution,
//   };
// };
// export const reviewService = {
//   createReview,
//   getTutorReviews,
// };
const prisma_1 = require("../../lib/prisma");
// Helper function to recalculate and update tutor rating
const updateTutorRating = async (tutorId) => {
    const allReviews = await prisma_1.prisma.review.findMany({
        where: { tutorId },
        select: { rating: true },
    });
    const totalReviews = allReviews.length;
    const avgRating = totalReviews > 0
        ? allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;
    await prisma_1.prisma.tutorProfile.update({
        where: { id: tutorId },
        data: {
            rating: Number(avgRating.toFixed(1)),
            totalReviews: totalReviews,
        },
    });
};
const createReview = async (studentId, payload) => {
    const { bookingId, rating, comment } = payload;
    // Validate rating (1-5)
    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
    }
    // Get booking
    const booking = await prisma_1.prisma.booking.findUnique({
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
    const review = await prisma_1.prisma.review.create({
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
    // ✅ Update tutor rating after review is created
    await updateTutorRating(booking.tutorId);
    return review;
};
const getTutorReviews = async (tutorId) => {
    const reviews = await prisma_1.prisma.review.findMany({
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
    const ratingCounts = await prisma_1.prisma.review.groupBy({
        by: ["rating"],
        where: { tutorId },
        _count: {
            rating: true,
        },
    });
    const ratingDistribution = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
    };
    ratingCounts.forEach((item) => {
        ratingDistribution[item.rating] = item._count.rating;
    });
    // Calculate average rating
    const totalReviews = reviews.length;
    const averageRating = totalReviews > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
        : 0;
    return {
        reviews,
        totalReviews,
        averageRating: Number(averageRating.toFixed(1)),
        ratingDistribution,
    };
};
exports.reviewService = {
    createReview,
    getTutorReviews,
};
