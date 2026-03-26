import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { tutorController } from "./tutor.controller";
const router = Router();
// Public routes
router.get("/", tutorController.getAllTutors);
// Protected tutor routes - ALL SPECIFIC ROUTES BEFORE /:id
router.get("/profile", auth(UserRole.TUTOR), tutorController.getMyProfile);
router.put("/profile", auth(UserRole.TUTOR), tutorController.updateProfile);
router.post("/profile", auth(UserRole.TUTOR), tutorController.createProfile);
router.get("/stats", auth(UserRole.TUTOR), tutorController.getStats);
router.get("/sessions", auth(UserRole.TUTOR), tutorController.getMySessions);
// Dynamic route MUST BE LAST
router.get("/:id", tutorController.getTutorById);
// //Specific protected routes FIRST (before /:id)
// router.get("/profile", auth(UserRole.TUTOR), tutorController.getMyProfile);
// router.post("/profile", auth(UserRole.TUTOR), tutorController.createProfile);
// router.put("/profile", auth(UserRole.TUTOR), tutorController.updateProfile);
// router.get("/stats", auth(UserRole.TUTOR), tutorController.getStats);
// router.get("/sessions", auth(UserRole.TUTOR), tutorController.getMySessions);
// // ✅ Dynamic route LAST (otherwise /profile, /stats, /sessions would be treated as :id)
// router.get("/", tutorController.getAllTutors);
// router.get("/:id", tutorController.getTutorById);
export const tutorRouter = router;
//# sourceMappingURL=tutor.routes.js.map