import { prisma } from "../../lib/prisma";

const createTutorProfile = async (userId: string, payload: any) => {
  // Prevent duplicate tutor profile
  const existingTutor = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (existingTutor) {
    throw new Error("Tutor profile already exists");
  }

  const tutor = await prisma.tutorProfile.create({
    data: {
      userId,
      bio: payload.bio,
      headline: payload.headline,
      subjects: payload.subjects || [],
      languages: payload.languages || [],
      education: payload.education,
      hourlyRate: payload.hourlyRate,
      experience: payload.experience || 0,
      categoryIds: payload.categoryIds || [],
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

  return tutor;
};

// Get all tutors with optional filters
const getAllTutors = async (filters: any) => {
  const where: any = {
    isAvailable: true,
  };

  // Search filter
  if (filters.search) {
    where.OR = [
      { user: { name: { contains: filters.search, mode: "insensitive" } } },
      { headline: { contains: filters.search, mode: "insensitive" } },
      { bio: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  // Category filter
  if (filters.category) {
    where.categoryIds = { has: filters.category };
  }

  // Price range filter
  if (filters.minPrice || filters.maxPrice) {
    where.hourlyRate = {};
    if (filters.minPrice) where.hourlyRate.gte = Number(filters.minPrice);
    if (filters.maxPrice) where.hourlyRate.lte = Number(filters.maxPrice);
  }

  // Rating filter
  if (filters.minRating) {
    where.rating = { gte: Number(filters.minRating) };
  }

  // Subject filter
  if (filters.subject) {
    where.subjects = { has: filters.subject };
  }

  const tutors = await prisma.tutorProfile.findMany({
    where,
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      rating: "desc",
    },
  });

  return tutors;
};

// Get tutor by ID
const getTutorById = async (tutorId: string) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: tutorId },
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
        where: { isActive: true },
        orderBy: { dayOfWeek: "asc" },
      },
      reviews: {
        include: {
          student: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!tutor) throw new Error("Tutor not found");
  return tutor;
};

// Update tutor profile
const updateProfile = async (userId: string, data: any) => {
  const existingProfile = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (!existingProfile) {
    throw new Error("Tutor profile not found");
  }

  return prisma.tutorProfile.update({
    where: { userId },
    data: {
      bio: data.bio,
      headline: data.headline,
      subjects: data.subjects,
      languages: data.languages,
      education: data.education,
      hourlyRate: data.hourlyRate,
      experience: data.experience,
      categoryIds: data.categoryIds,
      isAvailable: data.isAvailable,
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

// Delete tutor profile
const deleteProfile = async (userId: string) => {
  const existingProfile = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (!existingProfile) {
    throw new Error("Tutor profile not found");
  }

  await prisma.tutorProfile.delete({
    where: { userId },
  });

  return true;
};

// Get my profile
const getMyProfile = async (userId: string) => {
  const profile = await prisma.tutorProfile.findUnique({
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
        where: { isActive: true },
        orderBy: { dayOfWeek: "asc" },
      },
      reviews: {
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          student: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  if (!profile) throw new Error("Tutor profile not found");
  return profile;
};

// Get tutor sessions
const getSessions = async (userId: string, status?: string) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (!tutor) throw new Error("Tutor profile not found");

  const where: any = { tutorId: tutor.id };
  if (status) where.status = status;

  const bookings = await prisma.booking.findMany({
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
    orderBy: { date: "desc" },
  });

  return bookings;
};

// Get tutor statistics
const getStats = async (userId: string) => {
  const tutor = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (!tutor) throw new Error("Tutor profile not found");

  const [totalBookings, confirmedBookings, completedBookings, cancelledBookings] = await Promise.all([
    prisma.booking.count({ where: { tutorId: tutor.id } }),
    prisma.booking.count({ where: { tutorId: tutor.id, status: "CONFIRMED" } }),
    prisma.booking.count({ where: { tutorId: tutor.id, status: "COMPLETED" } }),
    prisma.booking.count({ where: { tutorId: tutor.id, status: "CANCELLED" } }),
  ]);

  const completedBookingsData = await prisma.booking.findMany({
    where: { tutorId: tutor.id, status: "COMPLETED" },
    select: { price: true },
  });

  const totalEarnings = completedBookingsData.reduce((sum, booking) => sum + booking.price, 0);

  return {
    totalBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,
    totalEarnings,
    rating: tutor.rating,
    totalReviews: tutor.totalReviews,
    totalSessions: tutor.totalSessions,
  };
};

export const tutorService = {
  createTutorProfile,
  getAllTutors,
  getTutorById,
  updateProfile,
  deleteProfile,
  getMyProfile,
  getSessions,
  getStats,
};