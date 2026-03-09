export declare const availabilityService: {
    createAvailability: (userId: string, payload: any) => Promise<any>;
    getMyAvailability: (userId: string) => Promise<{
        slots: any;
        groupedByDay: any;
    }>;
    updateAvailability: (availabilityId: string, userId: string, data: any) => Promise<any>;
    deleteAvailability: (availabilityId: string, userId: string) => Promise<boolean>;
};
//# sourceMappingURL=availability.service.d.ts.map