import { Request, Response } from "express";
import { tutorService } from "./tutor.service";

// GET /api/tutors - Get all tutors with filters
const getAllTutors = async (req: Request, res: Response) => {
  try {
    const { categoryId, minRate, maxRate, search, minRating } = req.query;

    const filters: {
      categoryId?: string;
      minRate?: number;
      maxRate?: number;
      search?: string;
      minRating?: number;
    } = {};

    if (categoryId) filters.categoryId = categoryId as string;
    if (minRate) filters.minRate = parseFloat(minRate as string);
    if (maxRate) filters.maxRate = parseFloat(maxRate as string);
    if (search) filters.search = search as string;
    if (minRating) filters.minRating = parseFloat(minRating as string);

    const tutors = await tutorService.getAllTutors(filters);

    res.status(200).json({
      success: true,
      data: tutors,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch tutors",
    });
  }
};

// GET /api/tutors/:id - Get single tutor by ID
const getTutorById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tutor = await tutorService.getTutorById(id as string);

    res.status(200).json({
      success: true,
      data: tutor,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Tutor not found",
    });
  }
};

// GET /api/tutor/profile - Get my tutor profile
const getMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const profile = await tutorService.getTutorProfileByUserId(userId);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Tutor profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch profile",
    });
  }
};


const createProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const payload = req.body;

    const profile = await tutorService.createTutorProfile(userId, payload);

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create profile",
    });
  }
};

// PUT /api/tutor/profile - Update tutor profile
const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const payload = req.body;

    const updatedProfile = await tutorService.updateTutorProfile(
      userId,
      payload
    );

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update profile",
    });
  }
};


const getStats = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const stats = await tutorService.getTutorStats(userId);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch stats",
    });
  }
};


const getMySessions = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { status } = req.query;

    const sessions = await tutorService.getTutorSessions(userId, status as string);

    res.status(200).json({
      success: true,
      data: sessions,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch sessions",
    });
  }
};

export const tutorController = {
  getAllTutors,
  getTutorById,
  getMyProfile,
  createProfile,
  updateProfile,
  getStats,
  getMySessions,
};

