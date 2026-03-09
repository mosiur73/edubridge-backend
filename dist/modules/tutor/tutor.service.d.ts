export declare const tutorService: {
    getAllTutors: (filters: {
        categoryId?: string;
        minRate?: number;
        maxRate?: number;
        search?: string;
        minRating?: number;
    }) => Promise<any>;
    getTutorById: (id: string) => Promise<any>;
    getTutorProfileByUserId: (userId: string) => Promise<any>;
    createTutorProfile: (userId: string, data: any) => Promise<any>;
    updateTutorProfile: (userId: string, data: any) => Promise<any>;
    getTutorStats: (userId: string) => Promise<{
        totalBookings: any;
        confirmedBookings: any;
        completedBookings: any;
        cancelledBookings: any;
        totalEarnings: number;
        rating: any;
        totalReviews: any;
        totalSessions: any;
    }>;
    getTutorSessions: (userId: string, status?: string) => Promise<any>;
};
//# sourceMappingURL=tutor.service.d.ts.map