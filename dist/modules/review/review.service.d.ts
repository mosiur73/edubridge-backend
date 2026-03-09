export declare const reviewService: {
    createReview: (studentId: string, payload: any) => Promise<any>;
    getTutorReviews: (tutorId: string) => Promise<{
        reviews: any;
        totalReviews: any;
        averageRating: number;
        ratingDistribution: Record<number, number>;
    }>;
};
//# sourceMappingURL=review.service.d.ts.map