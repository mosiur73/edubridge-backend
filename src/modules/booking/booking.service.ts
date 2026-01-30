import { prisma } from "../../lib/prisma";

const createBooking = async (studentId: string, payload: any) => {
  const { tutorId, subject, date, startTime, endTime, duration, price, notes, meetingLink } = payload;

  // Validate tutor exists and is available
  const tutor = await prisma.tutorProfile.findUnique({
    where: { id: tutorId },
  });

  if (!tutor) {
    throw new Error("Tutor not found");
  }

  if (!tutor.isAvailable) {
    throw new Error("Tutor is not available for bookings");
  }

  // Check if booking date is in the future
  const bookingDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (bookingDate < today) {
    throw new Error("Cannot book sessions in the past");
  }

  // Check for conflicting bookings
  const conflictingBooking = await prisma.booking.findFirst({
    where: {
      tutorId,
      date: bookingDate,
      status: { not: "CANCELLED" },
      OR: [
        {
          AND: [{ startTime: { lte: startTime } }, { endTime: { gt: startTime } }],
        },
        {
          AND: [{ startTime: { lt: endTime } }, { endTime: { gte: endTime } }],
        },
      ],
    },
  });

  if (conflictingBooking) {
    throw new Error("This time slot is already booked");
  }

  // Create booking
  const booking = await prisma.booking.create({
    data: {
      studentId,
      tutorId,
      subject,
      date: bookingDate,
      startTime,
      endTime,
      duration,
      price,
      notes,
      meetingLink,
      status: "CONFIRMED",
    },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      tutor: {
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
      },
    },
  });

  return booking;
};


const getMyBookings = async (userId: string, userRole: string, status?: string) => {
  let where: any = {};

  // Determine if user is student or tutor
  if (userRole === "STUDENT") {
    where.studentId = userId;
  } else if (userRole === "TUTOR") {
    // Get tutor profile
    const tutorProfile = await prisma.tutorProfile.findUnique({
      where: { userId },
    });

    if (!tutorProfile) {
      throw new Error("Tutor profile not found");
    }

    where.tutorId = tutorProfile.id;
  }

  // Filter by status if provided
  if (status) {
    where.status = status;
  }

  const bookings = await prisma.booking.findMany({
    where,
    orderBy: { date: "desc" },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      tutor: {
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
      },
      review: true,
    },
  });

  return bookings;
};


const getBookingById = async (bookingId: string, userId: string, userRole: string) => {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      tutor: {
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
      },
      review: true,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  // Check if user has access to this booking
  let hasAccess = false;

  if (userRole === "STUDENT" && booking.studentId === userId) {
    hasAccess = true;
  } else if (userRole === "TUTOR") {
    const tutorProfile = await prisma.tutorProfile.findUnique({
      where: { userId },
    });
    if (tutorProfile && booking.tutorId === tutorProfile.id) {
      hasAccess = true;
    }
  } else if (userRole === "ADMIN") {
    hasAccess = true;
  }

  if (!hasAccess) {
    throw new Error("You do not have permission to view this booking");
  }

  return booking;
};



export const bookingService = {
  createBooking,
  getMyBookings,
  getBookingById,
//   markComplete,
//   cancelBooking,
};