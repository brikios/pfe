import express  from "express";
import { addContract, countContractsByOwner, getContractByClient, getContractByOwner } from "../controllers/DemandController.js";
import {   verifyToken, verifyTokenContract, verifyUser } from "../middlewares/verifyToken.js";


const router = express.Router();


router.post("/addContract",verifyTokenContract,addContract);

router.get("/countContract/:id",countContractsByOwner)

router.get("/getOwner/:id",getContractByOwner)
router.get("/getClient/:id",getContractByClient)

export default router