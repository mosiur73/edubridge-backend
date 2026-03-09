export declare const adminService: {
    getStats: () => Promise<{
        overview: {
            totalUsers: any;
            totalStudents: any;
            totalTutors: any;
            totalAdmins: any;
            totalBookings: any;
            totalRevenue: number;
            totalReviews: any;
        };
        bookings: {
            total: any;
            confirmed: any;
            completed: any;
            cancelled: any;
        };
    }>;
    getAllUsers: (filters: {
        role?: string;
        search?: string;
    }) => Promise<any>;
    getAllBookings: (status?: string) => Promise<any>;
    getAllCategories: () => Promise<any>;
    createCategory: (data: {
        name: string;
        slug: string;
        description?: string;
        icon?: string;
    }) => Promise<any>;
    updateCategory: (id: string, data: {
        name?: string;
        slug?: string;
        description?: string;
        icon?: string;
        isActive?: boolean;
    }) => Promise<any>;
    banUser: (userId: string, data: {
        reason?: string;
        banExpires?: string;
    }) => Promise<any>;
    unbanUser: (userId: string) => Promise<any>;
};
//# sourceMappingURL=admin.service.d.ts.map