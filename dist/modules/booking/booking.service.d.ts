export declare const bookingService: {
    createBooking: (studentId: string, payload: any) => Promise<any>;
    getMyBookings: (userId: string, userRole: string, status?: string) => Promise<any>;
    getBookingById: (bookingId: string, userId: string, userRole: string) => Promise<any>;
    markComplete: (bookingId: string, userId: string) => Promise<any>;
    cancelBooking: (bookingId: string, userId: string, userRole: string) => Promise<any>;
};
//# sourceMappingURL=booking.service.d.ts.map