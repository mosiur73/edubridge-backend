"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const auth_1 = __importStar(require("../../middleware/auth"));
const admin_controller_1 = require("./admin.controller");
const router = (0, express_1.Router)();
// All routes require ADMIN role
router.use((0, auth_1.default)(auth_1.UserRole.ADMIN));
// Platform statistics
router.get("/stats", admin_controller_1.adminController.getStats);
// User management
router.get("/users", admin_controller_1.adminController.getAllUsers);
router.patch("/users/:id/ban", admin_controller_1.adminController.banUser); // ✅ Ban user
router.patch("/users/:id/unban", admin_controller_1.adminController.unbanUser); // ✅ Unban user
// Bookings management
router.get("/bookings", admin_controller_1.adminController.getAllBookings);
// Categories management
router.get("/categories", admin_controller_1.adminController.getAllCategories);
router.post("/categories", admin_controller_1.adminController.createCategory); //Extra
router.put("/categories/:id", admin_controller_1.adminController.updateCategory); //Extra
exports.adminRouter = router;
//# sourceMappingURL=admin.routes.js.map