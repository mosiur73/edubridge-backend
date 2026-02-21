import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { tutorController } from "./tutor.controller";

const router = Router();

// Public routes
router.get("/", tutorController.getAllTutors);
router.get("/:id", tutorController.getTutorById);

// Protected tutor routes
router.get("/profile", auth(UserRole.TUTOR), tutorController.getMyProfile);
router.put("/profile", auth(UserRole.TUTOR), tutorController.updateProfile);
router.post("/profile", auth(UserRole.TUTOR), tutorController.createProfile);
router.get("/stats", auth(UserRole.TUTOR), tutorController.getStats);
router.get("/sessions", auth(UserRole.TUTOR), tutorController.getMySessions);

export const tutorRouter: Router = router;