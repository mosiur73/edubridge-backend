"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorService = void 0;
const prisma_1 = require("../../lib/prisma");
// Get all tutors with filters
const getAllTutors = async (filters) => {
    const where = {
        isAvailable: true,
    };
    // Category filter
    if (filters.categoryId) {
        where.categoryIds = {
            has: filters.categoryId,
        };
    }
    // Price range filter
    if (filters.minRate || filters.maxRate) {
        where.hourlyRate = {};
        if (filters.minRate)
            where.hourlyRate.gte = filters.minRate;
        if (filters.maxRate)
            where.hourlyRate.lte = filters.maxRate;
    }
    // Search filter (name, bio, subjects)
    if (filters.search) {
        where.OR = [
            {
                user: {
                    name: { contains: filters.search, mode: "insensitive" },
                },
            },
            { bio: { contains: filters.search, mode: "insensitive" } },
            { headline: { contains: filters.search, mode: "insensitive" } },
            { subjects: { has: filters.search } },
        ];
    }
    const tutors = await prisma_1.prisma.tutorProfile.findMany({
        where,
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
            reviews: {
                select: { rating: true },
            },
            _count: {
                select: {
                    reviews: true,
                    bookings: true,
                },
            },
        },
        orderBy: {
            rating: "desc",
        },
    });
    // Calculate average rating for each tutor
    const tutorsWithRating = tutors.map((tutor) => {
        const avgRating = tutor.reviews.length > 0
            ? tutor.reviews.reduce((sum, r) => sum + r.rating, 0) /
                tutor.reviews.length
            : 0;
        return {
            ...tutor,
            averageRating: Number(avgRating.toFixed(1)),
            totalReviews: tutor._count.reviews,
            totalBookings: tutor._count.bookings,
        };
    });
    // Filter by minimum rating if specified
    if (filters.minRating) {
        return tutorsWithRating.filter((t) => t.averageRating >= filters.minRating);
    }
    return tutorsWithRating;
};
// Get tutor by ID
const getTutorById = async (id) => {
    const tutor = await prisma_1.prisma.tutorProfile.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
            availability: {
                orderBy: { dayOfWeek: "asc" },
            },
            reviews: {
                include: {
                    student: {
                        select: {
                            id: true,
                            name: true,
                            image: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            },
            _count: {
                select: {
                    reviews: true,
                    bookings: true,
                },
            },
        },
    });
    if (!tutor) {
        throw new Error("Tutor not found");
    }
    // Calculate average rating
    const avgRating = tutor.reviews.length > 0
        ? tutor.reviews.reduce((sum, r) => sum + r.rating, 0) /
            tutor.reviews.length
        : 0;
    return {
        ...tutor,
        averageRating: Number(avgRating.toFixed(1)),
        totalReviews: tutor._count.reviews,
        totalBookings: tutor._count.bookings,
    };
};
// Get tutor profile by user ID
const getTutorProfileByUserId = async (userId) => {
    return await prisma_1.prisma.tutorProfile.findUnique({
        where: { userId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
            availability: {
                orderBy: { dayOfWeek: "asc" },
            },
            _count: {
                select: {
                    reviews: true,
                    bookings: true,
                },
            },
        },
    });
};
// Create tutor profile
const createTutorProfile = async (userId, data) => {
    const { headline, bio, hourlyRate, experience, education, subjects, languages, categoryIds } = data;
    // Validation
    if (!headline || !hourlyRate) {
        throw new Error("Headline and hourly rate are required");
    }
    if (!subjects || subjects.length === 0) {
        throw new Error("At least one subject is required");
    }
    if (!languages || languages.length === 0) {
        throw new Error("At least one language is required");
    }
    // Check if profile already exists
    const existingProfile = await prisma_1.prisma.tutorProfile.findUnique({
        where: { userId },
    });
    if (existingProfile) {
        throw new Error("Profile already exists. Use update endpoint instead.");
    }
    // Create profile
    return await prisma_1.prisma.tutorProfile.create({
        data: {
            userId,
            headline,
            bio,
            hourlyRate: parseFloat(hourlyRate),
            experience: experience ? parseInt(experience) : 0,
            education,
            subjects: subjects || [],
            languages: languages || [],
            categoryIds: categoryIds || [],
            isAvailable: true,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
        },
    });
};
// Update tutor profile
const updateTutorProfile = async (userId, data) => {
    const { headline, bio, hourlyRate, experience, education, subjects, languages, categoryIds } = data;
    // Check if profile exists
    const tutorProfile = await prisma_1.prisma.tutorProfile.findUnique({
        where: { userId },
    });
    if (!tutorProfile) {
        // Create profile if not exists
        return await createTutorProfile(userId, data);
    }
    // Update profile
    return await prisma_1.prisma.tutorProfile.update({
        where: { userId },
        data: {
            ...(headline && { headline }),
            ...(bio !== undefined && { bio }),
            ...(hourlyRate && { hourlyRate: parseFloat(hourlyRate) }),
            ...(experience !== undefined && { experience: parseInt(experience) }),
            ...(education !== undefined && { education }),
            ...(subjects && { subjects }),
            ...(languages && { languages }),
            ...(categoryIds && { categoryIds }),
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
        },
    });
};
// Get tutor statistics
const getTutorStats = async (userId) => {
    const tutorProfile = await prisma_1.prisma.tutorProfile.findUnique({
        where: { userId },
    });
    if (!tutorProfile) {
        throw new Error("Tutor profile not found");
    }
    // Get all bookings
    const bookings = await prisma_1.prisma.booking.findMany({
        where: { tutorId: tutorProfile.id },
    });
    // Calculate stats
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED").length;
    const completedBookings = bookings.filter((b) => b.status === "COMPLETED").length;
    const cancelledBookings = bookings.filter((b) => b.status === "CANCELLED").length;
    const totalEarnings = bookings
        .filter((b) => b.status === "COMPLETED")
        .reduce((sum, b) => sum + b.price, 0);
    return {
        totalBookings,
        confirmedBookings,
        completedBookings,
        cancelledBookings,
        totalEarnings: Number(totalEarnings.toFixed(2)),
        rating: tutorProfile.rating,
        totalReviews: tutorProfile.totalReviews,
        totalSessions: tutorProfile.totalSessions,
    };
};
// Get tutor sessions (bookings)
const getTutorSessions = async (userId, status) => {
    const tutorProfile = await prisma_1.prisma.tutorProfile.findUnique({
        where: { userId },
    });
    if (!tutorProfile) {
        throw new Error("Tutor profile not found");
    }
    const where = {
        tutorId: tutorProfile.id,
    };
    if (status) {
        where.status = status;
    }
    return await prisma_1.prisma.booking.findMany({
        where,
        include: {
            student: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                },
            },
            review: true,
        },
        orderBy: {
            date: "desc",
        },
    });
};
exports.tutorService = {
    getAllTutors,
    getTutorById,
    getTutorProfileByUserId,
    createTutorProfile,
    updateTutorProfile,
    getTutorStats,
    getTutorSessions,
};
