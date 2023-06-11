import express  from "express";
import { addReport,   generateReportByProperty,   generateReportByUser, getAllReports, updateReportStatus } from "../controllers/ReportController.js";
import { verifyToken, verifyTokenContract } from "../middlewares/verifyToken.js";

const router=express.Router()

router.post("/addReport",verifyTokenContract,addReport);
router.get("/get",getAllReports)
router.get("/typeUser",generateReportByUser)
router.get("/typeProperty",generateReportByProperty)
router.put("/update",updateReportStatus)
export default router