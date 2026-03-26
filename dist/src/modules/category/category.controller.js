import { categoryService } from "./category.service";
// GET /api/categories - Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
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
export const categoryController = {
    getAllCategories,
};
//# sourceMappingURL=category.controller.js.map