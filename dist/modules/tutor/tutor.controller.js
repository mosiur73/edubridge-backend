"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tutorController = void 0;
const tutor_service_1 = require("./tutor.service");
// GET /api/tutors - Get all tutors with filters
const getAllTutors = async (req, res) => {
    try {
        const { categoryId, minRate, maxRate, search, minRating } = req.query;
        const filters = {};
        if (categoryId)
            filters.categoryId = categoryId;
        if (minRate)
            filters.minRate = parseFloat(minRate);
        if (maxRate)
            filters.maxRate = parseFloat(maxRate);
        if (search)
            filters.search = search;
        if (minRating)
            filters.minRating = parseFloat(minRating);
        const tutors = await tutor_service_1.tutorService.getAllTutors(filters);
        res.status(200).json({
            success: true,
            data: tutors,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch tutors",
        });
    }
};
// GET /api/tutors/:id - Get single tutor by ID
const getTutorById = async (req, res) => {
    try {
        const { id } = req.params;
        const tutor = await tutor_service_1.tutorService.getTutorById(id);
        res.status(200).json({
            success: true,
            data: tutor,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || "Tutor not found",
        });
    }
};
// GET /api/tutor/profile - Get my tutor profile
const getMyProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await tutor_service_1.tutorService.getTutorProfileByUserId(userId);
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch profile",
        });
    }
};
// POST /api/tutor/profile - Create tutor profile
const createProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const payload = req.body;
        const profile = await tutor_service_1.tutorService.createTutorProfile(userId, payload);
        res.status(201).json({
            success: true,
            message: "Profile created successfully",
            data: profile,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create profile",
        });
    }
};
// PUT /api/tutor/profile - Update tutor profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const payload = req.body;
        const updatedProfile = await tutor_service_1.tutorService.updateTutorProfile(userId, payload);
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: updatedProfile,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to update profile",
        });
    }
};
// GET /api/tutor/stats - Get tutor statistics
const getStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await tutor_service_1.tutorService.getTutorStats(userId);
        res.status(200).json({
            success: true,
            data: stats,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch stats",
        });
    }
};
// GET /api/tutor/sessions - Get tutor sessions
const getMySessions = async (req, res) => {
    try {
        const userId = req.user.id;
        const { status } = req.query;
        const sessions = await tutor_service_1.tutorService.getTutorSessions(userId, status);
        res.status(200).json({
            success: true,
            data: sessions,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch sessions",
        });
    }
};
exports.tutorController = {
    getAllTutors,
    getTutorById,
    getMyProfile,
    createProfile,
    updateProfile,
    getStats,
    getMySessions,
};
//# sourceMappingURL=tutor.controller.js.map