import express  from "express";
import { registreUser,loginUser } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/registre",registreUser)
router.post("/login",loginUser )

export default router