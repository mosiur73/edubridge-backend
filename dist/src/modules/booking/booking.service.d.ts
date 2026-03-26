export declare const bookingService: {
    createBooking: (studentId: string, payload: any) => Promise<{
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
    }>;
    getMyBookings: (userId: string, userRole: string, status?: string) => Promise<({
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
    getBookingById: (bookingId: string, userId: string, userRole: string) => Promise<{
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
    }>;
    markComplete: (bookingId: string, userId: string) => Promise<{
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
    }>;
    cancelBooking: (bookingId: string, userId: string, userRole: string) => Promise<{
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
    }>;
};
//# sourceMappingURL=booking.service.d.ts.map