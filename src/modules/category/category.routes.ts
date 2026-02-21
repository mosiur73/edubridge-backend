import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();

// Public route - Get all categories
router.get("/", categoryController.getAllCategories);

export const categoryRouter: Router = router;