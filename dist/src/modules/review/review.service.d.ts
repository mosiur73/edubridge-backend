export declare const reviewService: {
    createReview: (studentId: string, payload: any) => Promise<{
        booking: {
            date: Date;
            subject: string;
        };
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
    }>;
    getTutorReviews: (tutorId: string) => Promise<{
        reviews: ({
            booking: {
                date: Date;
                subject: string;
            };
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
        totalReviews: number;
        averageRating: number;
        ratingDistribution: Record<number, number>;
    }>;
};
//# sourceMappingURL=review.service.d.ts.map