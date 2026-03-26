import { Request, Response } from "express";
export declare const bookingController: {
    createBooking: (req: Request, res: Response) => Promise<void>;
    getMyBookings: (req: Request, res: Response) => Promise<void>;
    getBookingById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    markBookingComplete: (req: Request, res: Response) => Promise<void>;
    cancelBooking: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=booking.controller.d.ts.map