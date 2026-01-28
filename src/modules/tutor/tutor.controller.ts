import { Request, Response } from "express";
import { tutorService } from "./tutor.service";

// POST /api/tutor/profile
const createTutorProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const payload = req.body;

    const tutor = await tutorService.createTutorProfile(userId, payload);

    res.status(201).json({
      success: true,
      message: "Tutor profile created successfully",
      data: tutor,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/tutor
const getAllTutors = async (req: Request, res: Response) => {
  try {
    const filters = req.query;
    const tutors = await tutorService.getAllTutors(filters);
    
    res.json({ 
      success: true, 
      data: tutors 
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: "Server error", 
      error: error.message 
    });
  }
};

// GET /api/tutor/:id
const getTutorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid tutor id",
      });
    }

    const tutor = await tutorService.getTutorById(id);
    
    res.json({ 
      success: true, 
      data: tutor 
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// PUT /api/tutor/profile
const updateTutorProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const data = req.body;
    
    const profile = await tutorService.updateProfile(userId, data);
    
    res.json({ 
      success: true, 
      message: "Profile updated successfully",
      data: profile 
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// DELETE /api/tutor/profile
const deleteTutorProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    
    await tutorService.deleteProfile(userId);
    
    res.json({ 
      success: true, 
      message: "Profile deleted successfully" 
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// GET /api/tutor/profile
const getMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    
    const profile = await tutorService.getMyProfile(userId);
    
    res.json({ 
      success: true, 
      data: profile 
    });
  } catch (error: any) {
    res.status(404).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// GET /api/tutor/sessions
const getTutorSessions = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { status } = req.query;
    
    const sessions = await tutorService.getSessions(userId, status as string);
    
    res.json({ 
      success: true, 
      data: sessions 
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// GET /api/tutor/stats
const getTutorStats = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    
    const stats = await tutorService.getStats(userId);
    
    res.json({ 
      success: true, 
      data: stats 
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const tutorController = {
  createTutorProfile,
  getAllTutors,
  getTutorById,
  updateTutorProfile,
  deleteTutorProfile,
  getMyProfile,
  getTutorSessions,
  getTutorStats,
};