"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.availabilityController = void 0;
const availability_service_1 = require("./availability.service");
// POST /api/availability
const createAvailability = async (req, res) => {
    try {
        const userId = req.user.id;
        const payload = req.body;
        const availability = await availability_service_1.availabilityService.createAvailability(userId, payload);
        res.status(201).json({
            success: true,
            message: "Availability slot created successfully",
            data: availability,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
// GET /api/availability
const getMyAvailability = async (req, res) => {
    try {
        const userId = req.user.id;
        const availability = await availability_service_1.availabilityService.getMyAvailability(userId);
        res.json({
            success: true,
            data: availability,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
// PUT /api/availability/:id
const updateAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const data = req.body;
        const availability = await availability_service_1.availabilityService.updateAvailability(id, userId, data);
        res.json({
            success: true,
            message: "Availability slot updated successfully",
            data: availability,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
// DELETE /api/availability/:id
const deleteAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        await availability_service_1.availabilityService.deleteAvailability(id, userId);
        res.json({
            success: true,
            message: "Availability slot deleted successfully",
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.availabilityController = {
    createAvailability,
    getMyAvailability,
    updateAvailability,
    deleteAvailability,
};
//# sourceMappingURL=availability.controller.js.map