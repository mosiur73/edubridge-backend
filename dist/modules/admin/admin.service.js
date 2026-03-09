"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminService = void 0;
const prisma_1 = require("../../lib/prisma");
const getStats = async () => {
    // Get user counts
    const totalUsers = await prisma_1.prisma.user.count();
    const totalStudents = await prisma_1.prisma.user.count({ where: { role: "STUDENT" } });
    const totalTutors = await prisma_1.prisma.user.count({ where: { role: "TUTOR" } });
    const totalAdmins = await prisma_1.prisma.user.count({ where: { role: "ADMIN" } });
    // Get booking counts
    const totalBookings = await prisma_1.prisma.booking.count();
    const confirmedBookings = await prisma_1.prisma.booking.count({
        where: { status: "CONFIRMED" },
    });
    const completedBookings = await prisma_1.prisma.booking.count({
        where: { status: "COMPLETED" },
    });
    const cancelledBookings = await prisma_1.prisma.booking.count({
        where: { status: "CANCELLED" },
    });
    // Get total revenue
    const completedBookingsData = await prisma_1.prisma.booking.findMany({
        where: { status: "COMPLETED" },
        select: { price: true },
    });
    const totalRevenue = completedBookingsData.reduce((sum, booking) => sum + booking.price, 0);
    // Get total reviews
    const totalReviews = await prisma_1.prisma.review.count();
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
const getAllUsers = async (filters) => {
    const where = {};
    if (filters.role) {
        where.role = filters.role;
    }
    if (filters.search) {
        where.OR = [
            { name: { contains: filters.search, mode: "insensitive" } },
            { email: { contains: filters.search, mode: "insensitive" } },
        ];
    }
    return await prisma_1.prisma.user.findMany({
        where,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true,
            createdAt: true,
            emailVerified: true,
            banned: true,
            banReason: true,
            banExpires: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getAllBookings = async (status) => {
    const where = {};
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
    return await prisma_1.prisma.category.findMany({
        orderBy: {
            name: "asc",
        },
    });
};
const createCategory = async (data) => {
    const { name, slug, description, icon } = data;
    // Check if category exists
    const existingCategory = await prisma_1.prisma.category.findFirst({
        where: {
            OR: [{ name }, { slug }],
        },
    });
    if (existingCategory) {
        throw new Error("Category with this name or slug already exists");
    }
    return await prisma_1.prisma.category.create({
        data: {
            name,
            slug,
            description: description || null,
            icon: icon || null,
            isActive: true,
        },
    });
};
const updateCategory = async (id, data) => {
    const { name, slug, description, icon, isActive } = data;
    // Check if category exists
    const category = await prisma_1.prisma.category.findUnique({
        where: { id },
    });
    if (!category) {
        throw new Error("Category not found");
    }
    // Check for duplicate name/slug (excluding current category)
    if (name || slug) {
        const duplicate = await prisma_1.prisma.category.findFirst({
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
    return await prisma_1.prisma.category.update({
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
// ✅ Ban a user
const banUser = async (userId, data) => {
    // Check if user exists
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error("User not found");
    }
    // Prevent banning an admin
    if (user.role === "ADMIN") {
        throw new Error("Cannot ban an admin user");
    }
    // Already banned check
    if (user.banned) {
        throw new Error("User is already banned");
    }
    const banExpiresDate = data.banExpires ? new Date(data.banExpires) : null;
    return await prisma_1.prisma.user.update({
        where: { id: userId },
        data: {
            banned: true,
            banReason: data.reason || "Violated platform terms",
            banExpires: banExpiresDate,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            banned: true,
            banReason: true,
            banExpires: true,
        },
    });
};
// ✅ Unban a user
const unbanUser = async (userId) => {
    // Check if user exists
    const user = await prisma_1.prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error("User not found");
    }
    // Already unbanned check
    if (!user.banned) {
        throw new Error("User is not banned");
    }
    return await prisma_1.prisma.user.update({
        where: { id: userId },
        data: {
            banned: false,
            banReason: null,
            banExpires: null,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            banned: true,
            banReason: true,
            banExpires: true,
        },
    });
};
exports.adminService = {
    getStats,
    getAllUsers,
    getAllBookings,
    getAllCategories,
    createCategory,
    updateCategory,
    banUser,
    unbanUser,
};
//# sourceMappingURL=admin.service.js.map