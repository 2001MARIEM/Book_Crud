import { addAuthor, fetchAuthors } from "../controllers/author.js";

import express from "express";

const router = express.Router();

router.post("/", addAuthor);
router.get("/:id", fetchAuthors);

export default router;
