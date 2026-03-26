export declare const adminService: {
    getStats: () => Promise<{
        overview: {
            totalUsers: number;
            totalStudents: number;
            totalTutors: number;
            totalAdmins: number;
            totalBookings: number;
            totalRevenue: number;
            totalReviews: number;
        };
        bookings: {
            total: number;
            confirmed: number;
            completed: number;
            cancelled: number;
        };
    }>;
    getAllUsers: (filters: {
        role?: string;
        search?: string;
    }) => Promise<{
        role: import("../../../generated/prisma/enums").Role;
        id: string;
        createdAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image: string | null;
        banned: boolean;
        banReason: string | null;
        banExpires: Date | null;
    }[]>;
    getAllBookings: (status?: string) => Promise<({
        review: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
            bookingId: string;
            tutorId: string;
            studentId: string;
            comment: string | null;
        } | null;
        tutor: {
            user: {
                id: string;
                email: string;
                name: string;
                image: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            bio: string | null;
            headline: string | null;
            subjects: string[];
            languages: string[];
            education: string | null;
            hourlyRate: number;
            experience: number;
            categoryIds: string[];
            rating: number;
            totalReviews: number;
            totalSessions: number;
            isAvailable: boolean;
        };
        student: {
            id: string;
            email: string;
            name: string;
            image: string | null;
        };
    } & {
        date: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        duration: number | null;
        tutorId: string;
        studentId: string;
        startTime: string;
        endTime: string;
        subject: string;
        status: import("../../../generated/prisma/enums").BookingStatus;
        price: number;
        notes: string | null;
        meetingLink: string | null;
    })[]>;
    getAllCategories: () => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        slug: string;
        description: string | null;
        icon: string | null;
    }[]>;
    createCategory: (data: {
        name: string;
        slug: string;
        description?: string;
        icon?: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        slug: string;
        description: string | null;
        icon: string | null;
    }>;
    updateCategory: (id: string, data: {
        name?: string;
        slug?: string;
        description?: string;
        icon?: string;
        isActive?: boolean;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        slug: string;
        description: string | null;
        icon: string | null;
    }>;
    banUser: (userId: string, data: {
        reason?: string;
        banExpires?: string;
    }) => Promise<{
        role: import("../../../generated/prisma/enums").Role;
        id: string;
        email: string;
        name: string;
        banned: boolean;
        banReason: string | null;
        banExpires: Date | null;
    }>;
    unbanUser: (userId: string) => Promise<{
        role: import("../../../generated/prisma/enums").Role;
        id: string;
        email: string;
        name: string;
        banned: boolean;
        banReason: string | null;
        banExpires: Date | null;
    }>;
};
//# sourceMappingURL=admin.service.d.ts.map