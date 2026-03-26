export declare const availabilityService: {
    createAvailability: (userId: string, payload: any) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tutorId: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        isActive: boolean;
    }>;
    getMyAvailability: (userId: string) => Promise<{
        slots: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            tutorId: string;
            dayOfWeek: number;
            startTime: string;
            endTime: string;
            isActive: boolean;
        }[];
        groupedByDay: any;
    }>;
    updateAvailability: (availabilityId: string, userId: string, data: any) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tutorId: string;
        dayOfWeek: number;
        startTime: string;
        endTime: string;
        isActive: boolean;
    }>;
    deleteAvailability: (availabilityId: string, userId: string) => Promise<boolean>;
};
//# sourceMappingURL=availability.service.d.ts.map