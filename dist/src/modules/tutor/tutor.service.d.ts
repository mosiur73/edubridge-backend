export declare const tutorService: {
    getAllTutors: (filters: {
        categoryId?: string;
        minRate?: number;
        maxRate?: number;
        search?: string;
        minRating?: number;
    }) => Promise<{
        averageRating: number;
        totalReviews: number;
        totalBookings: number;
        user: {
            id: string;
            email: string;
            name: string;
            image: string | null;
        };
        reviews: {
            rating: number;
        }[];
        _count: {
            bookings: number;
            reviews: number;
        };
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
        totalSessions: number;
        isAvailable: boolean;
    }[]>;
    getTutorById: (id: string) => Promise<{
        averageRating: number;
        totalReviews: number;
        totalBookings: number;
        user: {
            id: string;
            email: string;
            name: string;
            image: string | null;
        };
        reviews: ({
            student: {
                id: string;
                name: string;
                image: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            rating: number;
            bookingId: string;
            tutorId: string;
            studentId: string;
            comment: string | null;
        })[];
        availability: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            tutorId: string;
            dayOfWeek: number;
            startTime: string;
            endTime: string;
            isActive: boolean;
        }[];
        _count: {
            bookings: number;
            reviews: number;
        };
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
        totalSessions: number;
        isAvailable: boolean;
    }>;
    getTutorProfileByUserId: (userId: string) => Promise<({
        user: {
            id: string;
            email: string;
            name: string;
            image: string | null;
        };
        availability: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            tutorId: string;
            dayOfWeek: number;
            startTime: string;
            endTime: string;
            isActive: boolean;
        }[];
        _count: {
            bookings: number;
            reviews: number;
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
    }) | null>;
    createTutorProfile: (userId: string, data: any) => Promise<{
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
    }>;
    updateTutorProfile: (userId: string, data: any) => Promise<{
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
    }>;
    getTutorStats: (userId: string) => Promise<{
        totalBookings: number;
        confirmedBookings: number;
        completedBookings: number;
        cancelledBookings: number;
        totalEarnings: number;
        rating: number;
        totalReviews: number;
        totalSessions: number;
    }>;
    getTutorSessions: (userId: string, status?: string) => Promise<({
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
};
//# sourceMappingURL=tutor.service.d.ts.map