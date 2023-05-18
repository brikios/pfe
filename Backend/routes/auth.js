import express  from "express";
import { registreUser,loginUser, logout } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register",registreUser)
router.post("/login",loginUser )
router.delete("/logout",logout)
export default router