"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const category_service_1 = require("./category.service");
// GET /api/categories - Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await category_service_1.categoryService.getAllCategories();
        res.status(200).json({
            success: true,
            data: categories,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch categories",
        });
    }
};
exports.categoryController = {
    getAllCategories,
};
