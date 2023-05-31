import express  from "express";
import { registreUser,loginUser, logout, confirmUser } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register",registreUser)
router.post("/confirm",confirmUser)
router.post("/login",loginUser )
router.delete("/logout",logout)
export default router