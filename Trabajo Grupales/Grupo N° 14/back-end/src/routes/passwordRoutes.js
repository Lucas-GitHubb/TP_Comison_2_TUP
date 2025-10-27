import express from "express";
import { forgotPassword, resetPassword } from "../controllers/passwordController.js";

const router = express.Router();

router.post("/forgot", forgotPassword);   // /api/password/forgot
router.post("/reset", resetPassword);     // /api/password/reset

export default router;
