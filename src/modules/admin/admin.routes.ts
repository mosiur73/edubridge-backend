import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { adminController } from "./admin.controller";

const router = Router();

// All routes require ADMIN role
router.use(auth(UserRole.ADMIN));

// Platform statistics
router.get("/stats", adminController.getStats);

// User management
router.get("/users", adminController.getAllUsers);
router.patch("/users/:id/ban", adminController.banUser);     // ✅ Ban user
router.patch("/users/:id/unban", adminController.unbanUser); // ✅ Unban user


// Bookings management
router.get("/bookings", adminController.getAllBookings);

// Categories management
router.get("/categories", adminController.getAllCategories);
router.post("/categories", adminController.createCategory);  //Extra
router.put("/categories/:id", adminController.updateCategory);   //Extra

export const adminRouter: Router = router;