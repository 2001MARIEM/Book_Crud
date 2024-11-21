import express from "express";
import { signup, login } from "../controllers/authentificationUser.js";
const router = express.Router();

// Route pour s'inscrire
router.post("/signup", signup);

// Route pour se connecter
router.post("/login", login);

export default router;
