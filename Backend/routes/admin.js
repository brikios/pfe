import express  from "express";
import { createAdmin, getRevenue, updateAdminRevenue } from "../controllers/AdminController.js";

const router = express.Router();

router.post("/new",createAdmin);
router.put("/update",updateAdminRevenue);
router.get("/get",getRevenue)
export default router