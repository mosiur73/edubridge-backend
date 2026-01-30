import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { tutorController } from "./tutor.controller";

const router = Router();

router.get("/", tutorController.getAllTutors);  //ok
router.get("/:id", tutorController.getTutorById); //ok

router.get("/profile/me", auth(UserRole.TUTOR), tutorController.getMyProfile);  //ok
router.post("/profile", auth(UserRole.TUTOR), tutorController.createTutorProfile); //ok
router.put("/profile", auth(UserRole.TUTOR), tutorController.updateTutorProfile);  //ok
router.delete("/profile", auth(UserRole.TUTOR), tutorController.deleteTutorProfile);  //ok
router.get("/sessions", auth(UserRole.TUTOR), tutorController.getTutorSessions);   //ok
router.get("/stats", auth(UserRole.TUTOR), tutorController.getTutorStats);  //uncomplate

export const tutorRouter: Router = router;










// router.post("/",auth(UserRole.TUTOR), tutorController.createTutorProfile)
// router.get("/", tutorController.getAllTutors);           
// router.get("/:id", tutorController.getTutorById);       

// // Tutor private routes
// router.put("/profile", auth(UserRole.TUTOR), tutorController.updateTutorProfile);          // Update profile
// router.put("/availability", auth(UserRole.TUTOR), tutorController.updateAvailability);     // Update availability
// router.get("/bookings", auth(UserRole.TUTOR), tutorController.getTutorBookings);          // Tutor bookings

// export const tutorRouter:Router= router;
