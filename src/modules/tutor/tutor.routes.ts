import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { tutorController } from "./tutor.controller";


const router = Router();

// Public routes
router.get("/", tutorController.getAllTutors);           
router.get("/:id", tutorController.getTutorById);       

// Tutor private routes
router.put("/profile", auth(UserRole.TUTOR), tutorController.updateTutorProfile);          // Update profile
router.put("/availability", auth(UserRole.TUTOR), tutorController.updateAvailability);     // Update availability
router.get("/bookings", auth(UserRole.TUTOR), tutorController.getTutorBookings);          // Tutor bookings

export const tutorRouter:Router= router;
