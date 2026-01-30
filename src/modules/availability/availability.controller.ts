import { Request, Response } from "express";
import { availabilityService } from "./availability.service";

// POST /api/availability
const createAvailability = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const payload = req.body;

    const availability = await availabilityService.createAvailability(userId, payload);

    res.status(201).json({
      success: true,
      message: "Availability slot created successfully",
      data: availability,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET /api/availability
const getMyAvailability = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const availability = await availabilityService.getMyAvailability(userId);

    res.json({
      success: true,
      data: availability,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PUT /api/availability/:id
const updateAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;
    const data = req.body;

    const availability = await availabilityService.updateAvailability(id as string, userId, data);

    res.json({
      success: true,
      message: "Availability slot updated successfully",
      data: availability,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE /api/availability/:id
const deleteAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    await availabilityService.deleteAvailability(id as string, userId);

    res.json({
      success: true,
      message: "Availability slot deleted successfully",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// PATCH /api/availability/:id/toggle
const toggleAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    const availability = await availabilityService.toggleAvailability(id as string, userId);

    res.json({
      success: true,
      message: "Availability status toggled successfully",
      data: availability,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const availabilityController = {
  createAvailability,
  getMyAvailability,
  updateAvailability,
  deleteAvailability,
  toggleAvailability,
};