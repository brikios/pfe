import express  from "express";

import { createContract } from "../controllers/ContractContoller.js";
const router = express.Router();


router.post("/addContract",createContract);


export default router