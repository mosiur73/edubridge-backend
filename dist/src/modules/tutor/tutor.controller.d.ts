import { Request, Response } from "express";
export declare const tutorController: {
    getAllTutors: (req: Request, res: Response) => Promise<void>;
    getTutorById: (req: Request, res: Response) => Promise<void>;
    getMyProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    createProfile: (req: Request, res: Response) => Promise<void>;
    updateProfile: (req: Request, res: Response) => Promise<void>;
    getStats: (req: Request, res: Response) => Promise<void>;
    getMySessions: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=tutor.controller.d.ts.map