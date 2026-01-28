import { Request, Response } from "express";
import { tutorService } from "./tutor.service";


// GET /api/tutors
 const getAllTutors = async (req: Request, res: Response) => {
    try {
        const filters = req.query;
        const tutors = await tutorService.getAllTutors(filters);
        res.json({ success: true, tutors });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};

// GET /api/tutors/:id
 const getTutorById = async (req: Request, res: Response) => {
    try {
       const { tutorId } = req.params;

if (!tutorId || typeof tutorId !== "string") {
  return res.status(400).json({
    success: false,
    message: "Invalid tutor id",
  });
}
        const tutor = await tutorService.getTutorById(tutorId);
        res.json({ success: true, tutor });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};

// PUT /api/tutor/profile
 const updateTutorProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const data = req.body;
        const profile = await tutorService.updateProfile(userId, data);
        res.json({ success: true, profile });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};

// PUT /api/tutor/availability
 const updateAvailability = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;
        const slots = req.body.slots;  // [{dayOfWeek, startTime, endTime, isActive}]
        const availability = await tutorService.updateAvailability(userId, slots);
        res.json({ success: true, availability });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};

// GET /api/tutor/bookings
 const getTutorBookings = async (req: Request, res: Response) => {
    try {
        const tutorId = req.user!.id;
        const bookings = await tutorService.getBookings(tutorId);
        res.json({ success: true, bookings });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err });
    }
};

export const tutorController={
        getAllTutors,
        getTutorById,
        updateTutorProfile,
        updateAvailability,
        getTutorBookings
}