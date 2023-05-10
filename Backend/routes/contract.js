import express  from "express";
import { addContract } from "../controllers/DemandController.js";
import {  verifyTokenContract, verifyUser } from "../middlewares/verifyToken.js";


const router = express.Router();


router.post("/addContract",verifyTokenContract,addContract);


export default router