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
exports.tutorRouter = void 0;
const express_1 = require("express");
const auth_1 = __importStar(require("../../middleware/auth"));
const tutor_controller_1 = require("./tutor.controller");
const router = (0, express_1.Router)();
// Public routes
router.get("/", tutor_controller_1.tutorController.getAllTutors);
// Protected tutor routes - ALL SPECIFIC ROUTES BEFORE /:id
router.get("/profile", (0, auth_1.default)(auth_1.UserRole.TUTOR), tutor_controller_1.tutorController.getMyProfile);
router.put("/profile", (0, auth_1.default)(auth_1.UserRole.TUTOR), tutor_controller_1.tutorController.updateProfile);
router.post("/profile", (0, auth_1.default)(auth_1.UserRole.TUTOR), tutor_controller_1.tutorController.createProfile);
router.get("/stats", (0, auth_1.default)(auth_1.UserRole.TUTOR), tutor_controller_1.tutorController.getStats);
router.get("/sessions", (0, auth_1.default)(auth_1.UserRole.TUTOR), tutor_controller_1.tutorController.getMySessions);
// Dynamic route MUST BE LAST
router.get("/:id", tutor_controller_1.tutorController.getTutorById);
// //Specific protected routes FIRST (before /:id)
// router.get("/profile", auth(UserRole.TUTOR), tutorController.getMyProfile);
// router.post("/profile", auth(UserRole.TUTOR), tutorController.createProfile);
// router.put("/profile", auth(UserRole.TUTOR), tutorController.updateProfile);
// router.get("/stats", auth(UserRole.TUTOR), tutorController.getStats);
// router.get("/sessions", auth(UserRole.TUTOR), tutorController.getMySessions);
// // ✅ Dynamic route LAST (otherwise /profile, /stats, /sessions would be treated as :id)
// router.get("/", tutorController.getAllTutors);
// router.get("/:id", tutorController.getTutorById);
exports.tutorRouter = router;
