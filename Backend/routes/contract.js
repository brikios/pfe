import express  from "express";
import { addContract, countContractsByOwner, getContractByClient, getContractByOwner, updateContract } from "../controllers/DemandController.js";
import {   verifyToken, verifyTokenContract, verifyUser } from "../middlewares/verifyToken.js";


const router = express.Router();


router.post("/addContract",verifyTokenContract,addContract);

router.get("/countContract/:id",countContractsByOwner)
router.put('/update/:id',updateContract)
router.get("/getOwner/:id",getContractByOwner)
router.get("/getClient/:id",getContractByClient)

export default router