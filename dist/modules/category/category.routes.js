"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const category_controller_1 = require("./category.controller");
const router = (0, express_1.Router)();
// Public route - Get all categories
router.get("/", category_controller_1.categoryController.getAllCategories);
exports.categoryRouter = router;
//# sourceMappingURL=category.routes.js.map