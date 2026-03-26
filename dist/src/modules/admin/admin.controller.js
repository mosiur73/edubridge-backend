import { adminService } from "./admin.service";
// GET /api/admin/stats - Platform statistics
const getStats = async (req, res) => {
    try {
        const stats = await adminService.getStats();
        res.status(200).json({
            success: true,
            data: stats,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch statistics",
        });
    }
};
// GET /api/admin/users - Get all users
const getAllUsers = async (req, res) => {
    try {
        const { role, search } = req.query;
        const users = await adminService.getAllUsers({
            role: role,
            search: search,
        });
        res.status(200).json({
            success: true,
            data: users,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch users",
        });
    }
};
// GET /api/admin/bookings - Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const { status } = req.query;
        const bookings = await adminService.getAllBookings(status);
        res.status(200).json({
            success: true,
            data: bookings,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Failed to fetch bookings",
        });
    }
};
// GET /api/admin/categories - Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await adminService.getAllCategories();
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
// POST /api/admin/categories - Create category
const createCategory = async (req, res) => {
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
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create category",
        });
    }
};
// PUT /api/admin/categories/:id - Update category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, description, icon, isActive } = req.body;
        const category = await adminService.updateCategory(id, {
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
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to update category",
        });
    }
};
// ✅ PATCH /api/admin/users/:id/ban - Ban a user
const banUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { reason, banExpires } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        const user = await adminService.banUser(id, { reason, banExpires });
        res.status(200).json({
            success: true,
            message: "User banned successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to ban user",
        });
    }
};
// ✅ PATCH /api/admin/users/:id/unban - Unban a user
const unbanUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        const user = await adminService.unbanUser(id);
        res.status(200).json({
            success: true,
            message: "User unbanned successfully",
            data: user,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to unban user",
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
    banUser,
    unbanUser,
};
//# sourceMappingURL=admin.controller.js.map