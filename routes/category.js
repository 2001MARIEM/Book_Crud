import { addCategory, fetchCategories } from "../controllers/category.js";

import express from "express";

const router = express.Router();

router.post("/", addCategory);
router.get("/:id", fetchCategories);

export default router;
