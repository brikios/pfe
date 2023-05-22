import express  from "express";
import { addReport } from "../controllers/ReportController.js";
import { verifyToken, verifyTokenContract } from "../middlewares/verifyToken.js";

const router=express.Router()

router.post("/addReport",verifyTokenContract,addReport);

export default router