import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth";
import { availabilityController } from "./availability.controller";
const router = Router();
router.get("/", auth(UserRole.TUTOR), availabilityController.getMyAvailability); //ok
router.post("/", auth(UserRole.TUTOR), availabilityController.createAvailability); //ok
router.put("/:id", auth(UserRole.TUTOR), availabilityController.updateAvailability); //ok
router.delete("/:id", auth(UserRole.TUTOR), availabilityController.deleteAvailability); //ok
export const availabilityRouter = router;
//# sourceMappingURL=availability.routes.js.map