import { Request, Response } from "express";
import { adminService } from "./admin.service";

// GET /api/admin/stats - Platform statistics
const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await adminService.getStats();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch statistics",
    });
  }
};

// GET /api/admin/users - Get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { role, search } = req.query;

    const users = await adminService.getAllUsers({
      role: role as string,
      search: search as string,
    });

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch users",
    });
  }
};

// GET /api/admin/bookings - Get all bookings
const getAllBookings = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;

    const bookings = await adminService.getAllBookings(status as string);

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch bookings",
    });
  }
};

// GET /api/admin/categories - Get all categories
const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await adminService.getAllCategories();

    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch categories",
    });
  }
};

// POST /api/admin/categories - Create category
const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, icon } = req.body;

    // Validation
    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "Name and slug are required",
      });
    }

    const category = await adminService.createCategory({
      name,
      slug,
      description,
      icon,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to create category",
    });
  }
};

// PUT /api/admin/categories/:id - Update category
const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, slug, description, icon, isActive } = req.body;

    const category = await adminService.updateCategory(id as string, {
      name,
      slug,
      description,
      icon,
      isActive,
    });

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update category",
    });
  }
};

export const adminController = {
  getStats,
  getAllUsers,
  getAllBookings,
  getAllCategories,
  createCategory,
  updateCategory,
};