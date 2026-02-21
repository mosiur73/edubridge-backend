import { prisma } from "../../lib/prisma";

const getStats = async () => {
  // Get user counts
  const totalUsers = await prisma.user.count();
  const totalStudents = await prisma.user.count({ where: { role: "STUDENT" } });
  const totalTutors = await prisma.user.count({ where: { role: "TUTOR" } });
  const totalAdmins = await prisma.user.count({ where: { role: "ADMIN" } });

  // Get booking counts
  const totalBookings = await prisma.booking.count();
  const confirmedBookings = await prisma.booking.count({
    where: { status: "CONFIRMED" },
  });
  const completedBookings = await prisma.booking.count({
    where: { status: "COMPLETED" },
  });
  const cancelledBookings = await prisma.booking.count({
    where: { status: "CANCELLED" },
  });

  // Get total revenue
  const completedBookingsData = await prisma.booking.findMany({
    where: { status: "COMPLETED" },
    select: { price: true },
  });

  const totalRevenue = completedBookingsData.reduce(
    (sum, booking) => sum + booking.price,
    0
  );

  // Get total reviews
  const totalReviews = await prisma.review.count();

  return {
    overview: {
      totalUsers,
      totalStudents,
      totalTutors,
      totalAdmins,
      totalBookings,
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalReviews,
    },
    bookings: {
      total: totalBookings,
      confirmed: confirmedBookings,
      completed: completedBookings,
      cancelled: cancelledBookings,
    },
  };
};

const getAllUsers = async (filters: { role?: string; search?: string }) => {
  const where: any = {};

  if (filters.role) {
    where.role = filters.role;
  }

  if (filters.search) {
    where.OR = [
      { name: { contains: filters.search, mode: "insensitive" } },
      { email: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  return await prisma.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
      emailVerified: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getAllBookings = async (status?: string) => {
  const where: any = {};

  if (status) {
    where.status = status;
  }

  return await prisma.booking.findMany({
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
    orderBy: {
      date: "desc",
    },
  });
};

const getAllCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

const createCategory = async (data: {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}) => {
  const { name, slug, description, icon } = data;

  // Check if category exists
  const existingCategory = await prisma.category.findFirst({
    where: {
      OR: [{ name }, { slug }],
    },
  });

  if (existingCategory) {
    throw new Error("Category with this name or slug already exists");
  }

  return await prisma.category.create({
    data: {
      name,
      slug,
      description: description || null,
      icon: icon || null,
      isActive: true,
    },
  });
};

const updateCategory = async (
  id: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
    icon?: string;
    isActive?: boolean;
  }
) => {
  const { name, slug, description, icon, isActive } = data;

  // Check if category exists
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  // Check for duplicate name/slug (excluding current category)
  if (name || slug) {
    const duplicate = await prisma.category.findFirst({
      where: {
        AND: [
          { id: { not: id } },
          {
            OR: [
              ...(name ? [{ name }] : []),
              ...(slug ? [{ slug }] : []),
            ],
          },
        ],
      },
    });

    if (duplicate) {
      throw new Error("Category with this name or slug already exists");
    }
  }

  return await prisma.category.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(slug && { slug }),
      ...(description !== undefined && { description }),
      ...(icon !== undefined && { icon }),
      ...(isActive !== undefined && { isActive }),
    },
  });
};

export const adminService = {
  getStats,
  getAllUsers,
  getAllBookings,
  getAllCategories,
  createCategory,
  updateCategory,
};