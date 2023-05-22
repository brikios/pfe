import express  from "express";
import { addContract, countContractsByOwner } from "../controllers/DemandController.js";
import {   verifyToken, verifyTokenContract, verifyUser } from "../middlewares/verifyToken.js";


const router = express.Router();


router.post("/addContract",verifyTokenContract ,addContract);

router.get("/countContract/:id",countContractsByOwner)
export default router