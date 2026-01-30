import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { tutorController } from "./tutor.controller";

const router = Router();

router.get("/", tutorController.getAllTutors);
router.get("/:id", tutorController.getTutorById);

router.get("/profile/me", auth(UserRole.TUTOR), tutorController.getMyProfile);
router.post("/profile", auth(UserRole.TUTOR), tutorController.createTutorProfile);
router.put("/profile", auth(UserRole.TUTOR), tutorController.updateTutorProfile);
router.delete("/profile", auth(UserRole.TUTOR), tutorController.deleteTutorProfile);
router.get("/sessions", auth(UserRole.TUTOR), tutorController.getTutorSessions);
router.get("/stats", auth(UserRole.TUTOR), tutorController.getTutorStats);

export const tutorRouter: Router = router;










// router.post("/",auth(UserRole.TUTOR), tutorController.createTutorProfile)
// router.get("/", tutorController.getAllTutors);           
// router.get("/:id", tutorController.getTutorById);       

// // Tutor private routes
// router.put("/profile", auth(UserRole.TUTOR), tutorController.updateTutorProfile);          // Update profile
// router.put("/availability", auth(UserRole.TUTOR), tutorController.updateAvailability);     // Update availability
// router.get("/bookings", auth(UserRole.TUTOR), tutorController.getTutorBookings);          // Tutor bookings

// export const tutorRouter:Router= router;
