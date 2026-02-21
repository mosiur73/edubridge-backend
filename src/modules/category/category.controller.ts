import { Request, Response } from "express";
import { categoryService } from "./category.service";

// GET /api/categories - Get all categories
const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();

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

export const categoryController = {
  getAllCategories,
};