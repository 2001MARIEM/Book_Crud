import {
  addBooks,
  addBookWithAuthorCheck,
  fetchBooks,
  fetchBooksById,
  updateBooks,
  deleteBooks,
} from "../controllers/book.js";
//import Book from "../models/book.js";
//restrindre l'accé a fetchBooks a l'admin
import { loggedMiddleware, isAdmin } from "../midelwares/midelware.js";
import express from "express";

const router = express.Router();

router.post("/", addBooks);
//restrindre l'accé a fetchBooks a l'admin
router.get("/", loggedMiddleware, isAdmin, fetchBooks);
router.get("/:id", fetchBooksById);
router.patch("/:id", updateBooks);
router.delete("/:id", deleteBooks);

export default router;
