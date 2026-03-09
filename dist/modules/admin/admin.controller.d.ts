import { Request, Response } from "express";
export declare const adminController: {
    getStats: (req: Request, res: Response) => Promise<void>;
    getAllUsers: (req: Request, res: Response) => Promise<void>;
    getAllBookings: (req: Request, res: Response) => Promise<void>;
    getAllCategories: (req: Request, res: Response) => Promise<void>;
    createCategory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateCategory: (req: Request, res: Response) => Promise<void>;
    banUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    unbanUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=admin.controller.d.ts.map