import express  from "express";
import { registreUser,loginUser, logout, confirmUser, refreshToken } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register",registreUser)
router.post("/confirm",confirmUser)
router.post("/refresh-token", refreshToken);
router.post("/login",loginUser )
router.delete("/logout",logout)
export default router